var fs = require('fs')

function vistaForm () {
  return fs.readFileSync(__dirname + '/html/form.html')
}

module.exports = {
  vistaForm
}
