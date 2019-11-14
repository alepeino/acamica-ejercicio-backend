const express = require('express')
const nuevoPostController = require('./controllers/nuevoPost')
const Post = require('./models/Post')

const PORT = 3000

const app = express()

app.set('view engine', 'ejs')

// middleware que procesa el body de la request
app.use(express.urlencoded({ extended: true }))

// endpoint "home"
app.get('/', (req, res, next) => {
  Post.listar()
    .then(posts => res.render('home', { posts }))
    .catch(error => next(error))
})

// endpoint de vista de detalle de un post
app.get('/posts/:id', (req, res, next) => {
  Post.buscarPorId(req.params.id)
    .then(post => res.render('post', { post }))
    .catch(err => next(err))
})

app.use('/nuevo', nuevoPostController)

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
