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

app.listen(PORT, () => console.log('Server en puerto ' + PORT))
