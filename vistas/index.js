var fs = require('fs')

function vistaForm () {
  return fs.readFileSync(__dirname + '/html/form.html')
}

function vistaError (error) {
  return fs.readFileSync(__dirname + '/html/error.html')
    .toString()
    .replace('{{ status }}', error.status)
    .replace('{{ mensaje }}', error.mensaje)
}

module.exports = {
  vistaError,
  vistaForm
}
