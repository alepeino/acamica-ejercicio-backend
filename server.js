const express = require('express')

const PORT = 3000
const app = express()

app.get('/', (req, res) => {
  res.send('Ok')
})

app.listen(PORT, () => console.log('Server en puerto ' + PORT))
