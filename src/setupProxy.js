const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // app.use(
  //   "/dev00/<*>",
  //   createProxyMiddleware({
  //     target: "https://h6i9k20b08.execute-api.us-east-1.amazonaws.com/",
  //     changeOrigin: true,
  //     onProxyRes: function (proxyRes, req, res) {
  //       proxyRes.headers["Access-Control-Allow-Origin"] = "*";
  //     },
  //   })
  // );
  // app.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: "http://54.242.213.239:1337/",
  //     changeOrigin: true,
  //   })
  // );
};
