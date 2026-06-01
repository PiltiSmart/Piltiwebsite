import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const cwd = "/Users/umeshkandhalu/Library/CloudStorage/GoogleDrive-idealumesh@gmail.com/My Drive/antigravity/website/pilti-modern";
const historyDir = path.join(cwd, "public", "run-history");
const historyFilePath = path.join(historyDir, "history.json");

export async function GET() {
  try {
    let historyList = [];
    if (fs.existsSync(historyFilePath)) {
      const fileContent = fs.readFileSync(historyFilePath, "utf8");
      historyList = JSON.parse(fileContent);
    }
    return NextResponse.json(historyList, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(historyDir)) {
      fs.rmSync(historyDir, { recursive: true, force: true });
    }
    return NextResponse.json({ success: true }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
