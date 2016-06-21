var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');


router.get('/', function(request, response) {
  // # FIXME: should return lectures list
  return response.send("lectures:list");
});


module.exports = router;
