const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const port  = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/hello', (req, res) => {
    res.send({message : 'Hello Server Excpress'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));