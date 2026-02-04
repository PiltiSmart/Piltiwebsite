import type { NextConfig } from "next";
import { execSync } from "child_process";

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    return "dev";
  }
};

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || "1.0.0",
    NEXT_PUBLIC_GIT_HASH: getGitHash(),
  },
};

export default nextConfig;
