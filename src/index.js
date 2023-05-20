const exp = require('constants')
const express = require ('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const DIRECTORY = "http://localhost:3000/"

const {mongoose} = require('./database')

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin:DIRECTORY
}))

// Routes
app.use('/api/students', require('./routes/student.routes'))
app.use('/api/parents', require('./routes/parent.routes'))
app.use('/api/admins', require('./routes/admin.routes'))
app.use('/api/attendances', require('./routes/attendance.routes'))
//      esto es para que cuando ponga eso en el navegador, requiera esta ruta

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})