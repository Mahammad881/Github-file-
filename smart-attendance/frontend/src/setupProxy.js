// frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy requests starting with '/api' to your Node.js backend on port 5000
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your Node.js backend URL
      changeOrigin: true,
    })
  );
};