import type { NextConfig } from "next";
import { execSync } from "child_process";

const getGitInfo = () => {
  // Prioritize environment variables if they are explicitly set (e.g., in Docker build)
  if (process.env.NEXT_PUBLIC_APP_VERSION && process.env.NEXT_PUBLIC_GIT_HASH) {
    return {
      version: process.env.NEXT_PUBLIC_APP_VERSION,
      hash: process.env.NEXT_PUBLIC_GIT_HASH
    };
  }

  try {
    const version = execSync("git describe --tags --always").toString().trim();
    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    return { version, hash };
  } catch (e) {
    return { version: "1.0.0", hash: "dev" };
  }
};

const gitInfo = getGitInfo();

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_VERSION: gitInfo.version,
    NEXT_PUBLIC_GIT_HASH: gitInfo.hash,
  },
};

export default nextConfig;
