const fsPromises = require('../fs-promises')

const POSTS_DIR = 'posts'

fsPromises.ensureDir(POSTS_DIR)

class Post {
  constructor (titulo, cuerpo) {
    this.titulo = titulo
    this.cuerpo = cuerpo
  }

  guardar () {
    return fsPromises.writeFile(POSTS_DIR + '/' + this.titulo, this.cuerpo)
  }

  static listar () {
    return fsPromises.readDir(POSTS_DIR)
      .then(titulos => titulos.map(titulo => new Post(titulo, null)))
  }

  static buscarPorId (id) {
    const titulo = id
    return fsPromises.readFile(POSTS_DIR + '/' + titulo)
      .then(cuerpo => new Post(titulo, cuerpo))
  }
}

module.exports = Post
