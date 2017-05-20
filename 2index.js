var express = require('express')
var mongo = require('mongodb').MongoClient
var bodyParser = require('body-parser')
var app = express()
var urlEncoded = bodyParser.urlencoded({extended: false})

var name = 'students' // collection name

mongo.connect('mongodb://127.0.0.1/Example', function(err, db) {
	if (err) {
		console.log("Failed to connect")
		db.close()
		return
	}

	app.get('/', function (req, res) {
		console.log('GET /')
		res.sendFile(__dirname + '/2home.html')
	})

	// copy paste:

	app.get('/insert', function (req, res) {
		console.log('GET /insert')
		res.sendFile(__dirname + '/2insert.html')
	})

	app.get('/find', function (req, res) {
		console.log('GET /find')
		res.sendFile(__dirname + '/2find.html')
	})
	app.get('/update',function(req,res){
		console.log('GET /update')
		res.sendfile(__dirname + '/2update.html')
	})

// INSERT: post request from form
	
	app.post('/insert', urlEncoded, function(req, res) {
		formData = { // parse form and map to DB
			name: req.body.name,
			usn: req.body.usn,
			dept: req.body.dept,
			grade: req.body.grade// parseFloat if you need
		} // you can just do formData = req.body, but adds unwanted fields
		// make sure you follow the same in both insert and find

		db.collection(name).insert(formData, function(err, doc) {
			if (err)
				res.sendFile(__dirname + '/error.html')
			else
				res.sendFile(__dirname + '/success.html')
		})

		console.log('Inserting ' + formData)
	})
	
	// copy paste:

	app.post('/find', urlEncoded, function(req, res) {
		formData = {grade: req.body.grade}

		db.collection(name).find(formData).toArray(function(err, arr) {
			if (err)
				res.sendFile(__dirname + '/error.html')
			else
				res.render('2result.ejs', {data: arr, grade: formData.grade})
		})

		console.log('Searching ' + formData)
	})
	app.post('/update',urlEncoded,function(req,res){
		formData= { // parse form and map to DB
			name: req.body.name,
			grade: req.body.grade// parseFloat if you need
		} 
		db.collection(name).update({name:formData.name},{$set:{grade:formData.grade}},function(err, doc) {
			if (err)
				res.sendFile(__dirname + '/error.html')
			else
				res.sendFile(__dirname + '/success.html')
		})

		console.log('Updating ' + formData)
	})

	var server = app.listen(5000, function() {
		console.log('Listening at http://%s:%s/', server.address().address, server.address().port)
	})
})