const express=require('express')
const exphbs=require('express-handlebars')
const bodyParser = require('body-parser');
const mysql=require('mysql')
const app=express()

require('dotenv').config()
const PORT=process.env.PORT||5000

// body parser  middleware
// url encoded
app.use(bodyParser.urlencoded({extended:false}))

// parse app-json
app.use(bodyParser.json())

// static folder
app.use(express.static('public'))









app.listen(PORT,
    ()=>console.log(`Listening on Port ${PORT}`))