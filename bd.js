const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'PASSWORD',
  database : 'blog'
})

function query (sql, parametros) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parametros, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = query
