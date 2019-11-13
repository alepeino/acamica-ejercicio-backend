const express = require('express')
const fsPromises = require('./fs-promises')

const PORT = 3000
const POSTS_DIR = 'posts'

const app = express()

fsPromises.ensureDir(POSTS_DIR)

app.set('view engine', 'ejs')

// middleware que procesa el body de la request
app.use(express.urlencoded({ extended: true }))

// endpoint "home"
app.get('/', (req, res, next) => {
  fsPromises.readDir(POSTS_DIR)
    .then(posts => res.render('home', { posts }))
    .catch(error => next(error))
})

// endpoint que envía el formulario de crear post
app.get('/nuevo', (req, res) => {
  res.render('form')
})

// endpoint que guarda el post
app.post('/nuevo', (req, res, next) => {
  fsPromises.writeFile(POSTS_DIR + '/' + req.body.titulo, req.body.cuerpo)
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

// endpoint de vista de detalle de un post
app.get('/posts/:id', (req, res, next) => {
  const titulo = req.params.id
  fsPromises.readFile(POSTS_DIR + '/' + titulo)
    .then(cuerpo => res.render('post', { post: { titulo, cuerpo }}))
    .catch(err => next(err))
})

// middleware que maneja las peticiones
// que no matchean con las rutas declaradas.
// genera un error, se le pasa al manejador con `next`
app.use((req, res, next) => {
  next({ status: 404, mensaje: 'Not found' })
})

// manejador de errores
// último middleware
app.use((err, req, res, next) => {
  console.error(err)
  const error = {
    status: err.status || 500,
    mensaje: err.mensaje || err.message
  }
  res.render('error', { error })
})

app.listen(PORT, () => console.log('Server en puerto ' + PORT))
