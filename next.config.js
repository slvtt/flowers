const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: "standalone",
  API_URL: "https://65688c5f9927836bd97507ed.mockapi.io",
  images: {
    domains: ["avatars.yandex.net"],
  },
});
