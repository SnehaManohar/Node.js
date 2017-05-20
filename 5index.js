var express = require('express')
var app=express()
var mongo = require('mongodb').MongoClient
var bodyParser =require('body-parser')
var urlencodeParser = bodyParser.urlencoded({extended:false})

var name = 'books'

mongo.connect('mongodb://127.0.0.1/Library',function(err,db){
	if(err)
	{
		console.log("Error connecting to db");
		db.close()
		return;
	}
	app.get('/',function(req,res){
		console.log("GET /")
		res.sendFile(__dirname+'/5home.html')
	})
	app.get('/insert',function(req,res){
		console.log("GET /insert")
		res.sendFile(__dirname+'/5insert.html')
	})
	app.get('/find',function(req,res){
		console.log("GET /search")
		res.sendFile(__dirname+'/5search.html')
	})
	app.get('/delete',function(req,res){
		console.log("GET /delete")
		res.sendFile(__dirname+'/5delete.html')
	})
	app.post('/insert',urlencodeParser,function(req,res){
		formData={
			name: req.body.name,
			title: req.body.title,
			author:req.body.author,
			subject:req.body.subject,
			year:req.body.year
		}
		db.collection(name).insert(formData , function(err,doc){
			if(err)
				res.sendFile(__dirname+'/error.html')
			else
				res.sendFile(__dirname+'/success.html')
		
	})
		console.log('Inserting ' + formData)
})
	app.post('/find',urlencodeParser,function(req,res){
		formData={name: req.body.name}
		db.collection(name).find(formData).toArray(function(err,arr){
			if(err)
				res.sendFile(__dirname+'/error.html')
			else
				res.render('5result.ejs',{data:arr,name:formData.name})
		
	})
})
app.post('/delete',urlencodeParser,function(req,res){
		formData={subject: req.body.subject}
		db.collection(name).remove({subject:{$ne:formData.subject}},function(err,arr){
			if(err)
				res.sendFile(__dirname+'/error.html')
			else
				res.sendFile(__dirname+'/success.html')
		
	})
})
var server = app.listen('5000',function(){
	console.log("Server listening at %s %s",server.address().address,server.address().port)
})
})