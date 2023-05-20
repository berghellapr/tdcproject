const mongoose = require('mongoose')

const URI = 'mongodb://localhost/tdc-db'

mongoose.connect(URI) //acá va la direcc a la que me voy a conectar
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err))

module.exports = mongoose