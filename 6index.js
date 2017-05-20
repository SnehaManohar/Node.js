var express = require('express')
var mongo = require('mongodb').MongoClient
var bodyParser = require('body-parser')
var app = express()
var urlEncoded = bodyParser.urlencoded({extended: false})
var expressValidator=require('express-validator')
app.use(expressValidator())
var name = 'students' // collection name

mongo.connect('mongodb://127.0.0.1/Validate', function(err, db) {
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
		res.sendFile(__dirname + '/6insert.html')
	})

	app.get('/find', function (req, res) {
		console.log('GET /find')
		res.sendFile(__dirname + '/6find.html')
	})

// INSERT: post request from form
	
	app.post('/insert', urlEncoded, function(req, res) {
		req.checkBody('name','Invalid Name').notEmpty();
		req.checkBody('marks','Invalid Marks').isInt();
		var errors=req.validationErrors();
		if(errors)
		{		res.write('<html><body>')
				for(var i=0;i<errors.length;i++)
				res.write('<h2>'+errors[i].msg+'</h2><br />')
				
				res.write('<a href=\'/\'>HOME</a>')
				//res.end()
				res.write('</html></body>')
			return;
		}
		
		formData = { // parse form and map to DB
			usn: req.body.usn,
			name: req.body.name,
			branch: req.body.branch,
			marks: parseInt(req.body.marks) // parseFloat if you need
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
		formData = {marks: parseInt(req.body.marks)}

		db.collection(name).find(formData).toArray(function(err, arr) {
			if (err)
				res.sendFile(__dirname + '/error.html')
			else
				res.render('6result.ejs', {data: arr, marks: formData.marks})
		})

		console.log('Searching ' + formData)
	})

	var server = app.listen(5000, function() {
		console.log('Listening at http://%s:%s/', server.address().address, server.address().port)
	})
})