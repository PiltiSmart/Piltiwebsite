import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const testTitle = searchParams.get("title");
  
  // Build Playwright command
  let command = 'PATH="$HOME/node/bin:$PATH" npx playwright test';
  if (testTitle) {
    // Sanitize title parameters to secure local execution against injection
    const sanitizedTitle = testTitle.replace(/[^a-zA-Z0-9\s™\-]/g, "");
    command += ` -g "${sanitizedTitle}"`;
  }

  // Project absolute working directory
  const cwd = "/Users/umeshkandhalu/Library/CloudStorage/GoogleDrive-idealumesh@gmail.com/My Drive/antigravity/website/pilti-modern";

  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
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
    // Playwright exits with non-zero on test failures; capture logs and return gracefully
    return NextResponse.json(
      { 
        success: false, 
        error: error.message, 
        stdout: error.stdout || "", 
        stderr: error.stderr || "" 
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
