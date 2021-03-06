var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = Schema({
  username: {
    type: String
  },
  lectures:[{
    lecture_id:{type: [mongoose.Schema.Types.ObjectId]},
    lecture_title: {type:String}
  }]
});


var Student = module.exports = mongoose.model('Student', studentSchema);


module.exports.getStudentByUsername = function(username, callback){
  var query = {username: username};
  Student.findOne(query, callback);
}


module.exports.register = function(info, callback) {
  var student_username = info['student_username'];

  var lecture_id = info['lecture_id'];
  var lecture_title = info['lecture_title'];

  var lecture = {lecture_id: lecture_id, lecture_title: lecture_title};
  console.log(lecture);

  var query = {username: student_username};
  Student.findOneAndUpdate(
    query,
    {$push: {"lectures": lecture}},
    {safe: true, upsert: true},
    callback
  );
}
