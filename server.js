const express=require('express');
const hbs=require('hbs');
const fs=require('fs')


var app=express();
hbs.registerPartials(__dirname +'/views/partial');
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.set('view_engine','hbs');
console.log(__dirname);

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method}:${req.url}`
    console.log(log);
    fs.appendFile("server.log",log+"\n",(err)=>{
        if(err){
        console.log("error in file");
        }
    });
    next();
});
app.use((req,res,next)=>{
   
    res.render("maintance.hbs",{
        pageTitle:"Maintance",
        message:"under progess"
    })
    
});

app.use(express.static(__dirname +'/public'));

app.get('/',(req,res)=>{
    //res.send('<h1>hello express!</h1>');
    res.render("home.hbs",{
        pageTitle:"Home",
        message:"Welcome to ast"
    })
});

app.get('/jsonFormat',(req,res)=>{
    res.send({
        name:"Ravi",
        designation:"Software Engineer"
    })
})

app.get('/about',(req,res)=>{
   // res.send("About page");
   res.render('about.hbs',{
       pageTitle:"About",
   });
})

app.get('/bad',(req,res)=>{
    res.send({
        status:"404",
        error:"page not found"
    })
})



app.listen(3000,()=>{
    console.log("server started")
});