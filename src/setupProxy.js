
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");

module.exports = function (app) {
  // app.use((req, res, next) => {
  //   res.header({ "Access-Control-Allow-Origin": "*" });
  //   next();
  // });
  app.use(
    "/dev00/<*>",
    createProxyMiddleware({
      target: "https://h6i9k20b08.execute-api.us-east-1.amazonaws.com/",
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    })
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ideasimov-reseource.com/",
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    })
  );
};
