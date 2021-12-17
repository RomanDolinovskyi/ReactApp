const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = createProxyMiddleware({
  target: "https://apiko-intensive-backend.herokuapp.com/",
  pathRewrite: {
    "^/api": "",
  },
  changeOrigin: true,
});

wsProxy = createProxyMiddleware({
  target: "https://apiko-intensive-backend.herokuapp.com/",
  changeOrigin: true,
  ws: true
})

module.exports = (app) => {
  app.use("/api", proxy);
  app.use('/socket.io', wsProxy);
};
