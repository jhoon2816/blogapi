const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const static = require('serve-static');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const router = express.Router();
const app = express();

app.set('port',process.env.PORT||4000);
app.set('views',__dirname('/views'));
app.set(static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:ture}));

app.use(cookieParser());
app.use(expressSession({
    secret:"",
    resave: true,
    saveUninitialized: true
}));

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/',router);


app.listen(app.get('port'),(req,res)=>{
    console.log('server start at port :'+app.get('port'));
});