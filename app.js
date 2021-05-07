const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const ejs=require("ejs");

var app=express();


var mysqlconn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"2805",
    database:"students",

});

mysqlconn.connect((err)=>{
    if(err){
        console.log("Connection failed"+err.message);
    }
    else{
        console.log("Connected");
    }
});

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM student";
    let query = mysqlconn.query(sql, (err, rows) => {
        if(err) 
            throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            students : rows
        });
    });
});

app.get('/add',(req,res)=>{
    res.render('add',{
        title:'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});

app.post('/save',(req,res)=>{
    let data= {rollno:req.body.rollno, name:req.body.name, branch:req.body.branch,college:req.body.clg};
    let sql="INSERT INTO student SET ?";
    let query= mysqlconn.query(sql,data,(err,results)=>{
        if(err)
            throw err;
        res.redirect('/');
    });
});

app.get('/edit/:rollno',(req,res)=>{
    const userId=req.params.rollno;
    let sql=`SELECT * from student where rollno= ${userId}`;
    let query= mysqlconn.query(sql,(err,result)=>{
        if(err) 
            throw err;
        res.render('edit',{
            title:'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user: result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    const id=req.body.id;
    let sql="update student SET rollno='"+req.body.rollno+"',name='"+req.body.name+"',branch='"+req.body.branch+"',college='"+req.body.clg+"' where rollno ="+id;
    let query= mysqlconn.query(sql,(err,results)=>{
        if(err)
            throw err;
        res.redirect('/');
    });
});

app.get('/delete/:rollno',(req,res)=>{
    const userId=req.params.rollno;
    let sql=`DELETE  from student where rollno= ${userId}`;
    let query= mysqlconn.query(sql,(err,result)=>{
        if(err) 
            throw err;
        res.redirect('/');
        });
    });





// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});

