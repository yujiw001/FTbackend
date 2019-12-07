const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

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
var cors = require('cors');
app.use(cors());
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
app.post('/users/add',jsonParser, (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const {username,password} = req.body;
    const INSERT_USERS_QUERY = `INSERT INTO employee_account (username,password) VALUES('${username}','${password}')`;
    db.query(INSERT_USERS_QUERY,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('插入成功')
        }
    });
});
// 增加新的司机
app.post('/drivers/add' ,jsonParser, (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const {Area,First_Name,Last_Name,Mobile,Address,City,PostalCode,description} = req.body;
    const INSERT_DRIVER_APPLICATION = `INSERT INTO driver_application (area,first_Name,
        last_Name,phone,street_address,city,postal_code,self_comment) 
        VALUES('${Area}','${First_Name}','${Last_Name}','${Mobile}','${Address}','${City}','${PostalCode}','${description}')`;   
    db.query(INSERT_DRIVER_APPLICATION,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('插入成功')
        }
    });
});
//插入意向地区
app.post('/drivers/desiredarea',jsonParser,(req,res)=>{
    const{DriverID,LAN_MARK,DesiredArea} = req.body;
    let data = [];
    for(i=0 ;i<DesiredArea.length;++i){
        data.push([DriverID,LAN_MARK,DesiredArea[i]])
        console.log(data);
    }
    console.log(data);
    const INSERT_DESIREAREA = "INSERT INTO preferred_area(join_us_id,lan_mark,desired_area) VALUES ?";
    db.query(INSERT_DESIREAREA,[data],(err,results)=>{
        if(err){
            return res.send('插入失败')
        }
        else{
            return res.send('插入成功')
        }
    })
})

//获取当前大表的id
app.get('/driverid',(req,res)=>{
    const SELECT_DRIVERID = `SELECT MAX(id) FROM driver_application `;
    db.query(SELECT_DRIVERID,(err,result)=>{
        if(err){
            console.log("找id时出现错误")
            return res.send(err)
        }
        else{
            console.log("找id成功")
            var target=JSON.stringify(result[0])
            console.log(target);
            console.log(JSON.parse(target)["MAX(id)"]);
            return res.send(result[0]);
        }
    });
});
//增加工作时间
// app.get('/drivers/availabletime' , (req,res)=>{
//     const {AvailableTime} = req.query;
//     const INSERT_AVAILABLETIME = `INSERT INTO available_work_time (available_time) VALUSES('${AvailableTime}')`;
//     db.query(INSERT_AVAILABLETIME,(err,results)=>{
//         if(err){
//             return res.send(err)
//         }
//         else{
//             return res.send('插入成功')
//         }
//     });
// })
//增加意向地区
// app.get('/drivers/desiredarea' , (req,res)=>{
//     const {DesiredArea} = req.query;
//     const INSERT_DESIREAREA = `INSERT INTO desired_area (available_area) VALUSES('${DesiredArea}')`;
//     db.query(INSERT_DESIREAREA,(err,results)=>{
//         if(err){
//             return res.send(err)
//         }
//         else{
//             return res.send('插入成功')
//         }
//     });
// })
//增加送餐方式
// app.get('/drivers/transportation' , (req,res)=>{
//     const {Transportation} = req.query;
//     const INSERT_DESIREAREA = `INSERT INTO transportation (transportation_method) VALUSES('${Transportation}')`;
//     db.query(INSERT_DESIREAREA,(err,results)=>{
//         if(err){
//             return res.send(err)
//         }
//         else{
//             return res.send('插入成功')
//         }
//     });
// })

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



