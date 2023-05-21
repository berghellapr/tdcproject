const exp = require('constants')
const express = require ('express')
const morgan = require('morgan')
const path = require('path')

const {mongoose} = require('./database')

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/students', require('./routes/student.routes'))
//      esto es para que cuando ponga eso en el navegador, requiera esta ruta

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})