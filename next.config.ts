import type { NextConfig } from "next";

// GitHub Pages 用のビルドだけ静的書き出し＋サブパス（/portfolio）にする
const pages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(pages && { output: "export", basePath: "/portfolio", trailingSlash: true }),
  // public/ の画像を <img> で参照するときに basePath を付けるため
  env: { NEXT_PUBLIC_BASE_PATH: pages ? "/portfolio" : "" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
