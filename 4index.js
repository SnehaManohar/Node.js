var express = require('express')
var bodyParser = require('body-parser')
var urlencodedParser= bodyParser.urlencoded({extended:false})
var app =express()

app.get('/',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/4home.html')
})

app.get('/RV',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/RV.html')
})

app.get('/BMS',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/BMS.html')
})

app.get('/MSRIT',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/MSRIT.html')
})

app.get('/PESIT',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/PESIT.html')
})

app.get('/BIT',function(req,res){
	console.log('GET /')
	res.sendfile(__dirname + '/BIT.html')
})
var server = app.listen(5000, function() {
		console.log('Listening at http://%s:%s/', server.address().address, server.address().port)
	})