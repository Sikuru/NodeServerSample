"use strict";
var mongoose = require('mongoose');

var schema_account = new mongoose.Schema({
	_id: {
		type: Number, required: true
	},
	name: {
		type: String, default: 0
	}
}, { collection: 'player_account' });

module.exports = mongoose.model('player_account', schema_account);