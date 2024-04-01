const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://shineray.by',
      changeOrigin: true,
      secure: true,
    }),
  )
}
