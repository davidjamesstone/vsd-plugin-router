const path = require('path')
const Hapi = require('hapi')
const server = new Hapi.Server({ port: 3000 })

async function composeServer () {
  await server.register({
    plugin: require('..'),
    options: {
      routes: path.join(__dirname, 'routes/routes.json')
    },
    routes: { prefix: '/my-routes' }
  })

  return server
}

module.exports = composeServer
