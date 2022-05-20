

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