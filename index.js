const express = require('express');
const app = express();

app.set('port',process.env.PORT||4000);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(app.get('port'),(req,res)=>{
    console.log('server start at port :'+app.get('port'));
});