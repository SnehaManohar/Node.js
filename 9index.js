var express = require('express')
var bodyParser = require('body-parser')
var urlencodedParser= bodyParser.urlencoded({extended:false})
var app =express()

app.get('/',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/9home.html')
})

app.get('/KARNATAKA',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/Karnataka.html')
})

app.get('/KASHMIR',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/Kashmir.html')
})

app.get('/ANDAMAN',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/AndamanAndNicobar.html')
})


var server = app.listen(5000, function() {
		console.log('Listening at http://%s:%s/', server.address().address, server.address().port)
	})