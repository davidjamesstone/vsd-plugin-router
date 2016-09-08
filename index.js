'use strict'

const path = require('path')

function getPath (mount, path) {
  if (mount) {
    return mount + (path === '/' ? '' : path)
  }
  return path
}

exports.register = function (server, options, next) {
  var routes = require(options.routes).routes
  var mount = options.mount
  var relativeTo = path.dirname(options.routes)

  routes.forEach(function (route) {
    if (route.ignore) {
      return
    }

    var resourcePath = relativeTo
      ? path.resolve(relativeTo, route.resource.path)
      : route.resource.path

    var resource = require(resourcePath)
    var name = route.resource.name

    if (name) {
      resource = resource[name]
    }

    var cfg = {
      path: getPath(mount, route.path),
      method: route.method,
      config: resource
    }

    if (route.description && !cfg.config.description) {
      cfg.config.description = route.description
    }

    server.route(cfg)
  })

  next()
}

exports.register.attributes = {
  pkg: require('./package.json'),
  multiple: true
}
