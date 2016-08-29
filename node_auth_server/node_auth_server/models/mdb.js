"use strict";
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sirtir-dev1.japanwest.cloudapp.azure.com/nas_db', {
	server: {
		poolSize: 5,
		autoReconnect: true
	}
});

mongoose.connection.on('error', function (err) {
	console.log('mongoose connection error :' + err);
});

mongoose.connection.on('connected', function () {
	console.log('mongoose connected');
});

mongoose.connection.on('disconnected', function () {
	console.log('mongoose disconnected');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('mongoose disposed');
		process.exit(0);
	});
});

// require models