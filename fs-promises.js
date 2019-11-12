const fs = require('fs')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function writeFile(file, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, (err, data) => {
      if (err) {
        reject (err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {
  ensureDir,
  writeFile
}
