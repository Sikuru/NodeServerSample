"use strict";
var mongoose = require('mongoose');

var schema_token_id = new mongoose.Schema({
	_id: {
		type: String, required: true
	},
	seq: {
		type: Number, default: 0
	}
}, { collection: 'token_id' });

module.exports = mongoose.model('token_id', schema_token_id);