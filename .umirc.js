import { defineConfig } from "umi";

export default defineConfig({
  hash: false,
  history: { type: "browser" },
  exportStatic: { htmlSuffix: true },
  //chainWebpack: (config, { webpack })=> {
    //config.merge({
      //mode: 'production',
      // optimization: {
      //   minimize: true,
      //   runtimeChunk: 'single',
      //   splitChunks: {
      //     chunks: 'all',
      //     automaticNameDelimiter: '.',
      //     cacheGroups: {
      //       vendor: {
      //         priority: 10,
      //         name: 'vendors',
      //         test({ resource }) {
      //           return /[\\/]node_modules[\\/]/.test(resource);
      //         }
      //       }
      //     }
      //   }
      // }
    //})
  //},
  // proxy: {
  //   "/api": {
  //     target: "http://127.0.0.1:3000",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       //'^/api': '',
  //     }
  //   }
  // }
});
