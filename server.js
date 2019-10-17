const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// 파일 처리를 위한 라이브러리
const multer = require('multer');

const app=express();
const port  = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user: conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

connection.connect();
// app.get('/api/hello', (req, res) => {
//     res.send({message : 'Hello Server Excpress'});
// });

/* 전체 조회 */
app.get('/api/customers', (req,res) => {
    connection.query(
        "SELECT * FROM customer WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

/* 고객 추가 */
const upload = multer({dest : './upload'});

app.use('/image',express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO customer VALUES ( null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.userName;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    // console.log(image);
    // console.log(name);
    // console.log(birthday);
    // console.log(gender);
    // console.log(job);

    let params = [image, name, birthday, gender, job];
  

    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);

            //console.log(err);
        }
    );

});

/* 고객 삭제 */
app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) =>{
            res.send(rows);
            console.log(err);
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));