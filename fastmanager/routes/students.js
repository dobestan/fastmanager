var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');
var User = require('../models/user');
var Student = require('../models/student');


router.get('/lectures', function(request, response, next){
  Student.getStudentByUsername(request.user.username, function(error, student){
    if(error) throw error;
    response.render('students/lectures', {student: student});
  });
});


router.post('/lectures/register', function(request, response){
  info = [];
  info['student_username'] = request.user.username;
  info['lecture_id'] = request.body.lecture_id;
  info['lecture_title'] = request.body.lecture_title;

  Student.register(info, function(error, student){
    if(error) throw error;
  });

  request.flash('success', '성공적으로 수강신청 되었습니다.');
  return response.redirect('/students/lectures/');
});


module.exports = router;
