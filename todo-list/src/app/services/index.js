const dyson = require('dyson')
const path = require('path')
const proxy = require('express-http-proxy')
const fs = require('fs')
const { Logger } = require('scribere')
const logger = new Logger()
logger.severity = 0
logger.info = logger.log
const options = {
    configDir: path.join(__dirname, 'services'),
    port: 3000
}
const configs = dyson.getConfigurations(options)
const appBefore = dyson.createServer(options)
const appAfter = dyson.registerServices(appBefore, options, configs)
// Remove * route defined by dyson to add our custom "magic" handler.
// eslint-disable-next-line no-underscore-dangle
const routes = appAfter._router.stack
routes.pop()
const fileFactory = (name, urlPath, method) => {
    return `
    const json = require('./json/${name}.json')
    const data = {
      path: '${urlPath}',
      method: '${method}',
      template: json,
      cache: false
    }
    module.exports = {
      data
    }
  `
}

appAfter.get(
    '*',
    proxy('http://localhost:8080', {
        userResDecorator
    })
)
appAfter.post(
    '*',
    proxy('http://localhost:8080', {
        userResDecorator
    })
)
appAfter.put(
    '*',
    proxy('http://localhost:8080', {
        userResDecorator
    })
)
appAfter.delete(
    '*',
    proxy('http://localhost:8080', {
        userResDecorator
    })
)
logger.log(`Mock server listening at port ${options.port}`)