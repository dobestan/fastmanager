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


router.get('/:lectureId/', function(request, response) {
  var lectureId = request.params.lectureId;

  Lecture.getLectureById(lectureId ,function(error, lecture){
    if (error) throw error;
    return response.render("lectures/detail", {
      lecture: lecture
    });
  });
});


router.get('/:lectureId/lessons', function(request, response, next) {
  var lectureId = request.params.lectureId;

  Lecture.getLectureById([lectureId],function(error, lecture){
    if (error) throw error;
    return response.render('lectures/lessons', {
      lecture: lecture
    });
  });
});


router.get('/:lectureId/lessons/:lessonId', function(request, response, next) {
  var lectureId = request.params.lectureId;
  var lessonId = request.params.lessonId;

  Lecture.getLectureById([lectureId],function(error, lecture){
    if (error) throw error;

    for(i=0;i<lecture.lessons.length;i++){
      if(lecture.lessons[i].lesson_number == lessonId){
        var lesson = lecture.lessons[i];
      }
    }

    return response.render('lectures/lesson', {
      lecture: lecture,
      lesson: lesson
    });
  });
});


module.exports = router;
