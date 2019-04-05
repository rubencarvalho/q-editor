const fs = require('fs')
const path = require('path')
const baseName = path.basename(__filename)
const controllers = {}

// Add all .js files that don't start with '.' in current directory to controllers object and export it
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== baseName && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const name = file.slice(0, file.length - 3)
    controllers[name] = require(`./${file}`)
  })

module.exports = controllers
