'use strict'

const path = require('path')

function getPath (mount, path) {
  if (mount) {
    return mount + (path === '/' ? '' : path)
  }
  return path
}

exports.plugin = {
  pkg: require('./package.json'),
  multiple: true,
  register: (server, options) => {
    const routes = require(options.routes).routes
    const mount = options.mount
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
        path: getPath(mount, route.path),
        method: route.method,
        config: resource
      }

      if (route.description && !cfg.config.description) {
        cfg.config.description = route.description
      }

      server.route(cfg)
    })
  }
}
