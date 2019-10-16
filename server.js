const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const port  = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// app.get('/api/hello', (req, res) => {
//     res.send({message : 'Hello Server Excpress'});
// });

app.get('/api/customers', (req,res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'http://placeimg.com/64/64/1',
            'name' : '홍길동1',
            'birthday' : '960720',
            'gender' : '남자',
            'job' : '학생'
        },
        {
            'id' : 2,
            'image' : 'http://placeimg.com/64/64/2',
            'name' : '홍길동2',
            'birthday' : '960720',
            'gender' : '남자',
            'job' : '프로그래머'
        },
        {
            'id' : 3,
            'image' : 'http://placeimg.com/64/64/3',
            'name' : '홍길동3',
            'birthday' : '960720',
            'gender' : '남자',
            'job' : '디자이너'
        }
        ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));