const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://93.177.124.158',
      changeOrigin: true,
      secure: true,
    }),
  )
}
