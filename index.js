const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const mysql = require('mysql');

const app = express();

app.set('port',process.env.PORT || 3000);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my_key',
    resave: true,
    initialize: true
}));

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'S3x87EboKu&',
    database : 'my_db'
});

const post = [
    {
        id : "1",
        title : "start blog",
        content : "this post is about to make blog api",
        author : "LJH",
        created_date : "2019.08.27",
        updated_date : "2019.08.27",
    }
];

app.get('/post',(req,res)=>{
    let sql = 'SELECT id, title FROM post'; 
    db.query(sql,(err,posts,fields)=>{
        if(err){
            console.log(err);
        }
        res.json({posts : posts}); 
    });
    //res.json(post);
});

app.post('/post/:id',(req,res)=>{
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;

    let sql = 'insert into post {title,content,author) values(?,?,?)';
    let params = [title, content, author];

    db.query(sql,params,(err,result,fields)=>{
        if(err){
          console.log('error');
        }
    });
    console.log('the file has been saved!');
    res.redirect('/post/'+result.insertId);
});

app.get(['/post/:id/edit'],(req,res)=>{
    let sql = 'select id from post';
    db.query(sql,(err,posts,fields)=>{
        let id = req.params.id;
        if(id){
            let sql = 'select * from post where id=?';
            db.query(sql,[id],(err, result, fields)=>{
                if(err){
                    console.log(err);
                } else {
                    res.send({posts: posts, post: post[0]});
                }
            });
        } else {
            console.log(err);
            res.send('There is no id');
        }
    });
});

app.post('/post/:id/edit',(req,res)=>{
    let sql = 'update post set title=?, content=?, author=? where id=?';
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let id = req.params.id;
    db.query(sql,[title, content,author,id], (err, result, fields)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect('/post/'+id);
        }
    })
});

app.get('/post/:id/delete',(req,res)=>{
    let sql = 'select id, title from post';
    let id = req.params.id;
    db.query(sql,(err, posts, fields)=>{
        let sql = 'select * from post where id=?';
        db.query(sql, [id], (err, post)=>{
            if(err){
                console.log(err);          
            } else {
                if(post.length === 0){
                    console.log('There is no record');
                } else {
                    res.json({posts:posts, post:post[0]});
                }
            }
        });
    })
});

app.post('/post/:id/delete',(req,res)=>{
    let title = req.params.title;
    let sql = 'delete from post where id=?';
    db.query(sql,[id],(err,result)=>{
        if(err) console.log(err);
        res.redirect('/post');
    });
});

app.get(['/post','/post/:id'],(req,res)=>{
    let sql = 'select id, title from post';
    db.query(sql, (err,posts, fields)=>{
        let id = req.params.id;
        if(id){
            let sql = 'select * from post where id=?';
            db.query(sql,[id],(err,post, fields)=>{
                if(err){
                    console.log(err);
                } else {
                    res.json({posts: posts, post : post[0] });
                }
            });
        } else {
            res.json( {posts: posts, post: undefined });
        }
    });
});

app.listen(app.get('port'),()=>{
    console.log('server start at port '+ app.get('port'));
});