const express = require('express')
const Post = require('../models/Post')

const controller = express.Router()

// endpoint que envía el formulario de crear post
controller.get('/', (req, res) => {
  res.render('form')
})

// endpoint que guarda el post
controller.post('/', (req, res, next) => {
  const post = new Post(req.body.titulo, req.body.cuerpo)
  post.guardar()
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

module.exports = controller
