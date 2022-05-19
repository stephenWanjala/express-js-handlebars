

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
                console.log(`data returned ${rows}`)
            } else{
               console.log("There is an error",err)
            }
        })
    })
}
