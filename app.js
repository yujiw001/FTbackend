const express = require('express');
const mysql = require('mysql');
const app = express();
// const bodyparser = require('body-parser');
// app.use(bodyparser.json);
//Create connection
const target =3;
const trash =3;

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wangyuji001',
    database : 'test'
});
// connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...')
});
//增

// let post = {id:1, lan_mark:'E', area:'LA',department:'tech',position:'Software developer',brief:'We are looking for an Intermediate Software Engineer to join our dev team during a dynamic growth stage of the company. We develop web-based software for TMS(transportation management system) , EDI and some portals. We are seeking an individual with a positive attitude with skills to match, being self-motivated and striving for excellence in their work, willing to grow and learn in our dynamic environment and the ability to work independently and within a team. So you will be having lots of opportunities to learn tech skills on Asp.net Framework/Core in Microsoft Azure Cloud.',responsibilities:' ',requirements:'',expedited:false};
// let sql = 'INSERT INTO company_recruitment SET ?';
// db.query(sql,post,(err,result) => {
//         if(err) throw err;
//         console.log(result);
// });



//Select posts

// db.query("SELECT position,area FROM company_recruitment WHERE id=" + target, function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
// db.query("DELETE FROM company_recruitment WHERE id=" + trash, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });

// let updated_sql = "UPDATE company_recruitment SET position = 'clown' WHERE id='1'"
// db.query(updated_sql,(err,result) => {
//     if (err) throw err;
//     console.log(result);
// })

//增加新用户
app.get('/users/add', (req,res)=>{
    const {username,password} = req.query;
    const INSERT_USERS_QUERY = `INSERT INTO employee_account (username,password) VALUES('${username}',${password})`;
    db.query(INSERT_USERS_QUERY,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('插入成功')
        }
    });
});




app.listen('3000' , () => {
    console.log('Server started on port 3000');
});















// Create DB
// app.get('/createdb' , (req,res) => {
//     let sql = 'CREATE DATABASE fantuan' ;
//     db.query(sql, (err , result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created...')
//     });
// });



