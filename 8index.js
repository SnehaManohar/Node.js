var express = require('express')
var mongo = require('mongodb').MongoClient
var bodyParser = require('body-parser')
var app = express()
var urlEncoded = bodyParser.urlencoded({extended: false})
var expressValidator=require('express-validator')
app.use(expressValidator())
var name = 'students' // collection name

mongo.connect('mongodb://127.0.0.1/Fonts', function(err, db) {
	if (err) {
		console.log("Failed to connect")
		db.close()
		return
	}

	app.get('/', function (req, res) {
		console.log('GET /')
		res.sendFile(__dirname + '/1home.html')
	})

	// copy paste:

	app.get('/insert', function (req, res) {
		console.log('GET /insert')
		res.sendFile(__dirname + '/8insert.html')
	})

	app.get('/find', function (req, res) {
		console.log('GET /find')
		res.sendFile(__dirname + '/8find.html')
	})

// INSERT: post request from form
	
	app.post('/insert', urlEncoded, function(req, res) {
		
		formData = { // parse form and map to DB
			usn: req.body.usn,
			name: req.body.name,
			branch: req.body.branch,
			sem: parseInt(req.body.sem) // parseFloat if you need
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
		//formData = {sem: parseInt(req.body.sem)}
		db.collection(name).find({sem:{$gt:0}}).toArray(function(err, arr) {
			if (err)
				res.sendFile(__dirname + '/error.html')
			else
				res.render('8result.ejs', {data: arr})//, sem: formData.sem})
		})

		console.log('Searching')
	})
	var server = app.listen(5000, function() {
		console.log('Listening at http://%s:%s/', server.address().address, server.address().port)
	})
})