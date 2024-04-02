const { createProxyMiddleware } = require('http-proxy-middleware')

const oAuth_routes = [
  '/oauth/google',
  '/oauth/google/authorised_callback',
  '/oauth/facebook',
  '/oauth/facebook/authorised_callback',
  '/oauth/instagram',
  '/oauth/instagram/authorised_callback',
  '/oauth/linkedin',
  '/oauth/linkedin/authorised_callback',
  '/oauth/github',
  '/oauth/github/authorised_callback',
  '/oauth/spotify',
  '/oauth/spotify/authorised_callback',
  '/oauth/local',
]

module.exports = function (app) {
  app.use(
    '/oauth', // if request URI path starts with "oauth", it will redirect to 3050 internally with proxy
    createProxyMiddleware({
      target: 'http://localhost:3050',
      changeOrigin: false,
    }),
  )
  app.use(
    '/api', // if request URI path starts with "api", it will redirect to 3050 internally with proxy
    createProxyMiddleware({
      target: 'http://localhost:3050',
      changeOrigin: false,
    }),
  )
}
