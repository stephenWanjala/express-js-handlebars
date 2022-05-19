const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

// body parser  middleware
// url encoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse app-json
app.use(bodyParser.json())

// static folder
app.use(express.static('public'))

// Templating engine 
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}))
// app.engine('hbs',exphbs.engine({extname: '.hbs'}))
app.set('view engine', 'handlebars')
// home page route
app.get('', (req, res) => res.render(('home')))
// route


// connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.databaseHost,
    user: process.env.databaseUser,
    password: process.env.databasePassword
})





app.listen(PORT,
    () => console.log(`Listening on Port ${PORT}`))