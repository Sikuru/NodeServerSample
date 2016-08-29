"use strict";
var express = require('express');
var router = express.Router();

// 모든 요청 무응답
router.all('/', function (req, res) {
    res.status(204).send('');
});

module.exports = router;