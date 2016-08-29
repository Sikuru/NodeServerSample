"use strict";
var NodeRSA = require('node-rsa');

var default_server_pk = '-----BEGIN RSA PRIVATE KEY-----\n' +
	'MIICWwIBAAKBgQCBGvYPPzSBzjIA+kYTPcARYZZYaEIec0G5eL0WnLHOUDbEmBYh\n' +
	'yzFXiPPKmOf5+vIJYjp/3J2pfkyIRSR7QJ9rM/KxFNDuGZ4pXQnGjR1r9H3GurTk\n' +
	'c6lMDXgtJ8JSv/uvd6yasYon+oeFnh4TVy0wf/H+g2qoFZGRUdLrELJVrQIDAQAB\n' +
	'AoGACr8Cwiwho7hVAy3RzWIzbX7w87Th5AT18IkzPAGY7zJQDLcYCIIQPlgA6tkl\n' +
	'XfJcWRmbAu+LFAOWPTV8HuI3Iqfm8P0XqMAZRW7k8uMYFWtdSuaq/ZcFdzo6R9Pi\n' +
	'5sh3MfCl8TEQ2ZFKZFjmr2bZpwcY9D3pwhnIlOisW2TGOiUCQQC/i/oQWrjbUYwr\n' +
	'wOIfB/4ney42ByOxiy/37uMBaNzmgoazMadyc7Tfdr2YO6yYPZ/UA/E0X63RVYVC\n' +
	'12fIW8VjAkEArIw3djAyWFgWNzoSp0rDeREhpdznqYYj+497UvHzFj92xYSsDdtV\n' +
	'9Lnikj+uzedbszRuIWFrw22ed2NRS+wtrwJABbtBg0XDrERXZmPCIF2T3EiSTGmQ\n' +
	'Rtq8V7XdMwiZO4iCUVBWC1Ws/tbFu41lj7SgWK65g/Cs+cuOTj61y0f7swJAAMja\n' +
	'b7UkZXZxE2s2LoCOhvxm9MQeYYz0mO48F1J2UoGTXq6Nwbpfl69IsnWLq/ADYLs6\n' +
	'TPiObuMOt2hCNGAsjQJARL9Qye3QWx2spG8+cRRc/57CaZWn+gLVWsH/IPOhiU1g\n' +
	'GGo5YfvDSq2DD16N7hp0SOq//z9+duQJhUW1tw48oQ==\n' +
	'-----END RSA PRIVATE KEY-----';

var token = (function () {
	var key;
	function Token(server_private_key = default_server_pk) {
		key = new NodeRSA(server_private_key);
	}

	Token.prototype.generateTokenString = function (otp_uid, account_uid) {
		var json_data = JSON.stringify({
			'u': otp_uid, 'a': account_uid
		});
		var data = new Buffer(json_data).toString('base64');
		var enc_data = key.encrypt(data, 'base64');
		return enc_data;
	}

	Token.prototype.extractToken = function (token_string) {
		if (!token_string) {
			return null;
		}
		try {
			var desc_data = key.decrypt(token_string, 'buffer');
			var json_data = JSON.parse(Buffer.from(Buffer.from(desc_data, 'base64').toString('ascii'), 'base64').toString('utf8'));
			return {
				otp_uid: json_data.u,
				account_uid: json_data.a
			};
		} catch (exception) {
			return null;
		}
	}

	return Token;
} ());


module.exports = token;