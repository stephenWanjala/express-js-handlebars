const express=require('express')
const exphbs=require('express-handlebars')
const bodyParser = require('body-parser');
const mysql=require('mysql')
const app=express()

require('dotenv').config()

const PORT=process.env.PORT||5000


app.listen(PORT,
    ()=>console.log(`Listening on Port ${PORT}`))