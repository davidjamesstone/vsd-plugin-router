const path = require('path')

module.exports = {
  plugin: {
    pkg: require('./package.json'),
    multiple: true,
    register: (server, options) => {
      const routes = require(options.routes).routes
      const relativeTo = path.dirname(options.routes)

      routes.forEach(function (route) {
        if (route.ignore) {
          return
        }

        const resourcePath = relativeTo
          ? path.resolve(relativeTo, route.resource.path)
          : route.resource.path

        let resource = require(resourcePath)
        const name = route.resource.name

        if (name) {
          resource = resource[name]
        }

        const cfg = {
          path: route.path,
          method: route.method,
          options: resource
        }

        if (route.description && !cfg.options.description) {
          cfg.options.description = route.description
        }

        server.route(cfg)
      })
    }
  }
}
