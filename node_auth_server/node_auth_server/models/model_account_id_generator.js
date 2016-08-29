"use strict";
var mongoose = require('mongoose');

// db.account_id_generator.insert({_id: 'uid', seq: 0});
var schema_account_id_generator = new mongoose.Schema({
	_id: {
		type: String, required: true
	},
	seq: {
		type: Number, default: 0
	}
}, { collection: 'account_id_generator' });

module.exports = mongoose.model('account_id_generator', schema_account_id_generator);