var express =require("express")
var app=express()
var bodyParser=require("body-parser")
var urlEncoded=bodyParser.urlencoded({extended:false})
var mongo=require("mongodb").MongoClient
var name = "department"
mongo.connect('mongodb://127.0.0.1/College',function(err,db){
	if(err){
		console.log("Errorconnecting");
		db.close()
		return
	}
	app.get('/',function(req,res){
		console.log("GET /")
		res.sendFile(__dirname+"/1home.html")
	})
	app.get('/insert',function(req,res){
		console.log("GET /")
		res.sendFile(__dirname+"/10insert.html")
	})
	app.get('/find',function(req,res){
		console.log("GET /")
		res.sendFile(__dirname+"/10find.html")
	})
	app.post('/insert',urlEncoded,function(req,res){
		formData={
			id: req.body.id,
			title:req.body.title,
			name:req.body.name,
			branch:req.body.branch
		}
		db.collection(name).insert(formData,function(err,doc){
			if(err)
				res.sendFile(__dirname+"/error.html")
			else
				res.sendFile(__dirname+"/success.html")
	})
})
	app.post('/find',urlEncoded,function(req,res){
		formData={
			title:req.body.title,
			branch:req.body.branch
		}
		db.collection(name).find({title:formData.title,branch:formData.branch}).toArray(function(err,arr){
			if(err)
				res.sendFile(__dirname+"/error.html")
			else
				res.render("10result.ejs",{data:arr,title:formData.title,branch:formData.branch})
	})
})
	var server=app.listen(5000,function(){
		console.log("Listening at %s %s",server.address().address,server.address().port)
	})
})