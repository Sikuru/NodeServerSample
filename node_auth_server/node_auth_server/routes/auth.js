"use strict";
var express = require('express');
var router = express.Router();
var async = require('async');
var m_token_id = require('../models/model_token');
var m_account_id_generator = require('../models/model_account_id_generator');
var m_account = require('../models/model_account');
var token_lib = require('../libs/token');

var token = new token_lib();

router.post('/login', function (req, res, next) {
	req.accepts('application/json');

	var req_data = req.body;
	var token_data = token.extractToken(req_data.login_token);

    m_token_id.findByIdAndUpdate({ _id: 'uid' }, {
		$inc: { seq: 1 }
	}, function (err, result) {
		if (err) {
			return next(err);
		}

		if (result) {
			var uid = result.seq;
			var res_data = {
				'access_token': token.generateTokenString(uid, token_data.account_uid)
			};

			res.json(res_data);
		}
	});
});

router.post('/signup', function (req, res, next) {
	req.accepts('application/json');

	var req_data = req.body;

	async.waterfall([
		function (callback) {
			// 계정 고유번호 생성
			m_account_id_generator.findByIdAndUpdate({ _id: 'uid' }, {
				$inc: { seq: 1 }
			}, function (err, result) {

				// req_data에서 가져와야 하지만 임시 정보
				var new_account_data = new m_account({
					_id: result.seq, // 계정 고유 아이디
					name: 'temp_name',
				});
				callback(err, new_account_data);
			});
		},
		function (new_account_data, callback) {
			// 계정 생성
			new_account_data.save(function (err) {
				callback(err, new_account_data);
			});
		},
		function (new_account_data, callback) {
			// 인증 토큰 생성
			m_token_id.findByIdAndUpdate({ _id: 'uid' }, {
				$inc: { seq: 1 }
			}, function (err, result) {
				if (err) {
					callback(err);
				}

				if (result) {
					var uid = result.seq;
					var res_data = {
						'login_token': token.generateTokenString(uid, new_account_data._id)
					};

					res.json(res_data);
				}

				callback(null);
			});
		}],
		function (err) {
			if (err) {
				return next(err);
			}
		}
	);
});

module.exports = router;