

const res = require('express/lib/response');
const mysql = require('mysql');
// connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    port:process.env.conectionPort,
    host: process.env.databaseHost,
    user: process.env.databaseUser,
    password: process.env.databasePassword
})


// view users
exports.view=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err 
        console.log('connected with-> ',connection.threadId)

        // user connection

        connection.query(` SELECT * from ${process.env.databaseName}.user`,(err,rows)=>{
            if(!err){
                res.render('home',{rows})
                console.log(`data returned ${rows.toString()}`)
            } else{
               console.log("There is an error",err)
            }
         })
    })  
}

exports.find=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err 
        console.log('connected with-> ',connection.threadId)

        // user connection
        let searchTerm=req.body.search

        connection.query(`select * from ${process.env.databaseName}.user where first_name like ? `,['%'+ searchTerm+'%'],(err,rows)=>{
            if(!err){
                res.render('home',{rows})
                console.log(`data returned ${rows}`)
            } else{
               console.log("There is an error",err)
            }
         })
    }) 
}

// display form
exports.form=(req,res)=>{
    res.render('addUser')
}

// add new user

exports.create=(req,res)=>{
    const {first_name,last_name,email,phone,comments}=req.body
    
    pool.getConnection((err,connection)=>{
        if(err) throw err 
        console.log('connected with-> ',connection.threadId)

        // user connection
        let searchTerm=req.body.search

        connection.query(`insert  into ${process.env.databaseName}.user set first_name=?,last_name=?,
         email=?,phone=?, comments=?`,[first_name,last_name,email,phone,comments],(err,rows)=>{
            if(!err){
                res.render('addUser',{alert:`user  added succefuly`})
                console.log(`add User data returned ${rows}`)
            } else{
               console.log("There is an error",err)
            }
         })
    })
}

exports.editUser=(req,res)=>{
    res.render('editUser')
}