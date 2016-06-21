var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');


router.get('/', function(request, response) {
  Lecture.getLectures(function(error, lectures) {
    if (error) throw error;
    return response.render("lectures/index", {
      lectures: lectures
    });
  });
});


module.exports = router;
