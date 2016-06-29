var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');
var Teacher = require('../models/teacher');
var User = require('../models/user');


router.get('/lectures', function(request, response, next){
});


router.post('/lectures/register', function(request, response){
});


router.get('/lectures/:lectureId/lessons/new', function(request, response, next){
});


router.post('/lectures/:lectureId/lessons/new', function(request, response, next){
});


module.exports = router;
