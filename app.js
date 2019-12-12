const express = require('express');

const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const app = express();
app.use(fileUpload());
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var multer = require('multer')
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
    // const RESET_PRIMARYKEY = "ALTER TABLE preferred_area AUTO_INCREMENT=1;"
    const INSERT_DESIREAREA = "INSERT INTO preferred_area(join_us_id,lan_mark,desired_area) VALUES ?";
    // db.query(RESET_PRIMARYKEY,(err,results)=> {
    //     if(err){
    //         return res.send('重置主键失败')
    //     }
    //     db.query(INSERT_DESIREAREA,[data],(err,results)=>{
    //         if(err){
    //             return res.send('地点插入失败')
    //         }
    //         else{
    //             return res.send('地点插入成功')
    //         }
    //     })
    // })
    db.query(INSERT_DESIREAREA,[data],(err,results)=>{
        if(err){
            return res.send('地点插入失败')
        }
        else{
            return res.send('地点插入成功')
        }
    })
})
//可选时间
app.post('/drivers/availabletime',jsonParser,(req,res)=>{
    const{DriverID,LAN_MARK,AvailableTime} = req.body;
    let data = [];
    for(i=0 ;i<AvailableTime.length;++i){
        data.push([DriverID,LAN_MARK,AvailableTime[i]])
        console.log(data);
    }
    console.log(data);
    const INSERT_AVAILABLETIME = "INSERT INTO available_work_time(join_us_id,lan_mark,available_time) VALUES ?";
    db.query(INSERT_AVAILABLETIME,[data],(err,results)=>{
        if(err){
            return res.send('时间插入失败')
        }
        else{
            return res.send('时间插入成功')
        }
    })
})
//增加出行方式
app.post('/drivers/transportation',jsonParser,(req,res)=>{
    const{DriverID,LAN_MARK,Transportation} = req.body;
    let data = [];
    for(i=0 ;i<Transportation.length;++i){
        data.push([DriverID,LAN_MARK,Transportation[i]])
        console.log(data);
    }
    console.log(data);
    const INSERT_TRANSPORTATION = "INSERT INTO transportation_method(join_us_id,lan_mark,transportation) VALUES ?";
    db.query(INSERT_TRANSPORTATION,[data],(err,results)=>{
        if(err){
            return res.send('出行方式插入失败')
        }
        else{
            return res.send('出行方式插入成功')
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
//上传文件
app.post('/uploadfile',(req,res) => {
    if(req.file === null) {
        return res.status(400).json({msg:'No file uploaded'});
    }
    else {
        console.log('file received');
        console.log(req);
        var sql = "INSERT INTO driver_application(resume) VALUES ('"+ req.file + "')";
    }
});
//增加新的伙伴合作
app.post('/partner/add' ,jsonParser, (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    console.log('后台已响应')
    const {Area,First_Name,Last_Name,Mobile,Email,Bname,Address,City,PostalCode,Category,description} = req.body;
    const INSERT_PARTNER_APPLICATION = `INSERT INTO partner_application (area,first_name,
        last_name,phone,email,business_name,street_address,city,postal_code,business_category,business_description) 
        VALUES('${Area}','${First_Name}','${Last_Name}','${Mobile}','${Email}','${Bname}','${Address}','${City}','${PostalCode}','${Category}','${description}')`;   
    db.query(INSERT_PARTNER_APPLICATION,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('伙伴插入成功')
        }
    });
});
//增加新的广告投放
app.post('/advertisement/add' ,jsonParser, (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    console.log('后台已响应')
    const {Area,First_Name,Last_Name,Mobile,Email,Bname,Address,City,PostalCode,Category,description} = req.body;
    const INSERT_ADVERTISEMENT_APPLICATION = `INSERT INTO advertisement_application (area,first_name,
        last_name,phone,email,business_name,street_address,city,postal_code,business_category,business_description) 
        VALUES('${Area}','${First_Name}','${Last_Name}','${Mobile}','${Email}','${Bname}','${Address}','${City}','${PostalCode}','${Category}','${description}')`;   
    db.query(INSERT_ADVERTISEMENT_APPLICATION,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('广告伙伴插入成功')
        }
    });
});

//后台新闻编辑插入
app.post('/news/add' ,jsonParser, (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    console.log("新闻后台已经响应")
    const {user,type,lan_mark,title,cover,content} = req.body;
    console.log(req.body);
    console.log(type);
    const INSERT_NEWS_EDITOR = `INSERT INTO article (user,type,lan_mark,title,cover,content) VALUES('${user}','${type}','${lan_mark}','${title}','${cover}','${content}')`;   
    db.query(INSERT_NEWS_EDITOR,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('新闻插入成功')
        }
    });
});
//新闻展示
app.get('/news/display',(req,res) => {
    const SELECT_NEWSDATA = `SELECT id, date,type,title,cover,content FROM article `;
    db.query(SELECT_NEWSDATA,(err,result)=>{
        if(err){
            console.log("找新闻数据时出现错误")
            return res.send(err)
        }
        else{
            console.log("找新闻数据成功")
            console.log(result);
            return res.send(result);
        }
    });
})
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



