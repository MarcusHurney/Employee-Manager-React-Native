require('./backend/config/config');

//to run: 'npm run dev' -- serves with nodemon
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const router = require('./backend/services/router');

mongoose.connect(process.env.MONGODB_URI, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(router);

const PORT = process.env.PORT;

//creates an http server that can receive requests and forward them to app (express())
const SERVER = http.createServer(app);

SERVER.listen(PORT, function() {
	console.log('Server listening on port:', PORT);
});
