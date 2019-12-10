function hacerAlgo(callback) {

}

hacerAlgo(function (err, resultado) {
  if (err) {
    salioMal(err)
  } else {
    salioBien(resultado)
  }
})

hacerAlgo()
  .then(resultado => salioBien(resultado))
  .catch(error => salioMal(error))
