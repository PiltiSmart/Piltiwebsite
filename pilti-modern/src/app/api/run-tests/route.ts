import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

async function saveRunHistory({
  success,
  stdout,
  stderr,
  testTitle,
  parallel,
  cwd,
  testIds
}: {
  success: boolean;
  stdout: string;
  stderr: string;
  testTitle: string | null;
  parallel: boolean;
  cwd: string;
  testIds: number[];
}) {
  try {
    const runId = `run-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    // Determine run type description
    let runType = "Full Suite Parallel";
    if (testTitle) {
      runType = `Single Test: ${testTitle}`;
    } else if (!parallel) {
      runType = "Sequential Sweep";
    }

    // 1. Create run-history folders inside public/
    const historyDir = path.join(cwd, "public", "run-history");
    const runsDir = path.join(historyDir, "runs", runId);
    fs.mkdirSync(runsDir, { recursive: true });

    // 2. Synchronize videos for this specific run
    try {
      const archiveVideoDir = path.join(runsDir, "video-telemetry");
      fs.mkdirSync(archiveVideoDir, { recursive: true });
      await execAsync(`cp -R test-results/* "${archiveVideoDir}/" 2>/dev/null || true`, { cwd });
    } catch (err) {
      console.error("Failed to archive run history videos:", err);
    }

    // 3. Read history.json, append entry, and save
    const historyFilePath = path.join(historyDir, "history.json");
    let historyList: any[] = [];
    if (fs.existsSync(historyFilePath)) {
      try {
        const fileContent = fs.readFileSync(historyFilePath, "utf8");
        historyList = JSON.parse(fileContent);
      } catch (err) {
        console.error("Failed to parse history.json, resetting list:", err);
      }
    }

    historyList.unshift({
      runId,
      timestamp,
      type: runType,
      success,
      stdout,
      stderr,
      testIds
    });

    // Prune history list to last 50 runs to keep disk usage under control
    if (historyList.length > 50) {
      const oldRuns = historyList.splice(50);
      for (const oldRun of oldRuns) {
        try {
          const oldRunFolder = path.join(historyDir, "runs", oldRun.runId);
          if (fs.existsSync(oldRunFolder)) {
            fs.rmSync(oldRunFolder, { recursive: true, force: true });
          }
        } catch (err) {
          console.error(`Failed to clean up old run folder ${oldRun.runId}:`, err);
        }
      }
    }

    fs.writeFileSync(historyFilePath, JSON.stringify(historyList, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to save run history entry:", e);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const testTitle = searchParams.get("title");
  const parallel = searchParams.get("parallel") !== "false";
  const headed = searchParams.get("headed") === "true";
  const testIdsParam = searchParams.get("testIds");
  const testIds = testIdsParam ? testIdsParam.split(",").map(id => parseInt(id, 10)) : [];
  
  // Build Playwright command
  let command = 'PATH="$HOME/node/bin:$PATH" npx playwright test';
  if (!parallel) {
    command += " --workers=1";
  }
  if (headed) {
    command += " --headed";
  }
  
  if (testTitle) {
    // Sanitize title parameters to secure local execution against injection
    const sanitizedTitle = testTitle.replace(/[^a-zA-Z0-9\s™\-/,()']/g, "");
    command += ` -g "${sanitizedTitle}"`;
  }

  // Project absolute working directory
  const cwd = "/Users/umeshkandhalu/Library/CloudStorage/GoogleDrive-idealumesh@gmail.com/My Drive/antigravity/website/pilti-modern";

  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    // Synchronize the fresh video telemetry recordings into our stable playback directory
    try {
      await execAsync("cp -R test-results/* public/video-telemetry/ 2>/dev/null || true", { cwd });
    } catch (err) {
      console.error("Failed to copy fresh test videos to telemetry cache:", err);
    }

    // Save run event history asynchronously
    await saveRunHistory({ success: true, stdout, stderr, testTitle, parallel, cwd, testIds });

    return NextResponse.json(
      { success: true, stdout, stderr },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error: any) {
    const stdout = error.stdout || "";
    const stderr = error.stderr || "";

    // Sync videos even if failed so that recorded failure videos show up
    try {
      await execAsync("cp -R test-results/* public/video-telemetry/ 2>/dev/null || true", { cwd });
    } catch (err) {
      console.error("Failed to copy fresh test videos to telemetry cache:", err);
    }

    // Save run event history asynchronously
    await saveRunHistory({ success: false, stdout, stderr, testTitle, parallel, cwd, testIds });

    // Playwright exits with non-zero on test failures; capture logs and return gracefully
    return NextResponse.json(
      { 
        success: false, 
        error: error.message, 
        stdout, 
        stderr 
      },
      {
        status: 200, // Return 200 so the client can inspect fail details
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
