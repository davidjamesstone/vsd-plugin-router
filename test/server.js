const path = require('path')
const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({ port: 3000 })

server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  server.register({
    register: require('..'),
    options: {
      routes: path.join(__dirname, 'routes/routes.json'),
      mount: '/my-routes'
    }
  }, (err) => {
    if (err) {
      throw err
    }
  })
})

module.exports = server
