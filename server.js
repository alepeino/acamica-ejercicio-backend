const express = require('express')
const vistas = require('./vistas')

const PORT = 3000
const app = express()

// endpoint "home"
app.get('/', (req, res) => {
  res.send('Ok')
})


// endpoint que envía el formulario de crear post
app.get('/nuevo', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(vistas.vistaForm())
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
  res.set('Content-Type', 'text/html')
  res.status(err.status).send(vistas.vistaError(error))
})

app.listen(PORT, () => console.log('Server en puerto ' + PORT))
