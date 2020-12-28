
var express = require('express')  
var app = express()  

var mongojs = require('mongojs')

var cString = "mongodb+srv://farid:farid@cluster0.1broi.mongodb.net/capstone?retryWrites=true&w=majority";
var db = mongojs(cString, ['data'])

app.use(express.static('collection')); 

app.get('/', function (req, res) {  
	res.sendFile(__dirname+"/collection/main.html")  
})  
  
app.get('/register',function(req,res){
	var d ={
		firstname : req.query.fname,
		lastname : req.query.lname,
		email : req.query.mail,
		password : req.query.pswd,
		contactnumber : req.query.phoneno,
		gender : req.query.gndr
	}
	db.data.insert(d,function(err,docs){
		if(err){
			res.send("something went wrong please try again")
		}
		else{
			res.sendFile(__dirname+"/collection/signin.html")
		}
	})
})

app.get('/signin',function(req,res){
	var d ={
		email : req.query.email_id,
		password : req.query.pass
	}
	db.data.find(d,function(err,docs){
		if(err){
			res.send("something went wrong please try again")
		}
		if(docs.length>0){
			res.sendFile(__dirname+"/collection/order.html")
		}
		else{
			res.send("once check your email and password you entered")
		}
	})
})


var cString = "mongodb+srv://farid:farid@cluster0.1broi.mongodb.net/capstone?retryWrites=true&w=majority";
var md = mongojs(cString, ['order'])


app.get('/delivery',function(req,res){
	var a ={
		order : req.query.cakename,
		FullName : req.query.fullname,
		MobileNumber : req.query.number,
		PinCode : req.query.pcode,
		Locality : req.query.locality,
		Address : req.query.add,
		City : req.query.city,
		State : req.query.state,
		Landmark : req.query.mark,
		AlternateMobileNumber : req.query.alt 
	}
	md.order.insert(a,function(err,docs){
		if(err){
			res.send("something went wrong please try again")
		}
		else{
			res.sendFile(__dirname+"/collection/placed.html"); 
		}
	})
})


app.listen(3000, function () {  
console.log("Started!!")  
})