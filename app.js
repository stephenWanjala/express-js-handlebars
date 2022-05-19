const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
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
const routes=require('./server/routes/user')
app.use('/',routes)


// connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.databaseHost,
    user: process.env.databaseUser,
    password: process.env.databasePassword
})

pool.getConnection((err,Connection)=>{
    if(err)    throw err   // not connected
    console.log(`connected with id ${Connection.threadId}`)
    
})



app.listen(PORT,
    () => console.log(`Listening on Port ${PORT}`))