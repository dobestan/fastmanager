var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var lectureSchema = Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  teacher: {
    type: String
  },
  lessons: [{
    lesson_number: {type: Number},
    lesson_title: {type: String},
    lesson_body: {type: String}
  }]
});


var Lecture = module.exports = mongoose.model("Lecture", lectureSchema);


module.exports.getLectures = function(callback, limit) {
  Lecture.find(callback).limit(limit);
}

module.exports.getLectureById = function(id, callback) {
  Lecture.findById(id, callback);
}

module.exports.addLesson = function(lesson, callback) {
  lecture_id = lesson['lecture_id'];

  lesson_number = lesson['lesson_number'];
  lesson_title = lesson['lesson_title'];
  lesson_body = lesson['lesson_body'];

  Lecture.findByIdAndUpdate(
    lecture_id,
    {$push: {"lessons": {lesson_number: lesson_number, lesson_title: lesson_title, lesson_body: lesson_body}}},
    {safe: true, upsert: true},
    callback
  );
}
