import { defineConfig } from "umi";

export default defineConfig({
  history: { type: "browser" },
  exportStatic: { htmlSuffix: true },
  proxy: {
    "/api": {
      target: "http://127.0.0.1:3000",
      changeOrigin: true,
      pathRewrite: {
        //'^/api': '',
      }
    }
  }
});
