var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');
var Teacher = require('../models/teacher');
var User = require('../models/user');


router.get('/lectures', function(request, response, next){
  Teacher.getTeacherByUsername(request.user.username, function(error, teacher){
    if (error) throw error;
    return response.render('teachers/lectures', {teacher: teacher});
  });
});


router.post('/lectures/register', function(request, response){
  info = [];
  info['teacher_username'] = request.user.username;
  info['lecture_id'] = request.body.lecture_id;
  info['lecture_title'] = request.body.lecture_title;

  Teacher.register(info, function(error, teacher){
    if(error) throw error;
  });

  request.flash('success', '성공적으로 강사에 등록되었습니다.');
  return response.redirect('/teachers/lectures/');
});


router.get('/lectures/:lectureId/lessons/new', function(request, response, next){
  var lectureId = request.params.lectureId;

  return response.render('teachers/newLesson',{
    lecture_id: lectureId
  });
});


router.post('/lectures/:lectureId/lessons/new', function(request, response, next){
  var lectureId = request.params.lectureId;

  var info = [];
  info['lecture_id'] = request.params.lectureId;
  info['lesson_number'] = request.body.lesson_number;
  info['lesson_title'] = request.body.lesson_title;
  info['lesson_body'] = request.body.lesson_body;

  Lecture.addLesson(info, function(error, lesson){
  });

  request.flash('success','신규 수업이 등록되었습니다.');
  return response.redirect('/teachers/lectures');
});


module.exports = router;
