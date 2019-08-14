const express = require("express");

router.get('/login',(req,res)=>{
    let paramId = req.query.id || req.body.id;
    let paramPassword = req.query.password || req.body.password;

    if(!err){
        throw err;
    } else {

        res.writeHead('200','content-type:html'+'charset=utf8');
        res.write('<p>'+paramId+'</p>');
        res.write(<p>'+paramPassword+</p>);
        res.write(<a href="/login"></a>);
        res.end();
    }
});
