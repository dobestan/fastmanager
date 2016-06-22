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
