var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  address: [{
    street_address:{type: String},
    city:{type: String},
    state:{type: String},
    zip:{type: String}
  }],
  username: {
    type: String
  },
  email: {
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
  student_username = info['student_username'];

  lecture_id = info['lecture_id'];
  lecture_title = info['lecture_title'];

  var query = {username: student_username};
  Student.findOneAndUpdate(
    query,
    {$push: {"lectures": {lecture_id: lecture_id, lecture_title: lecture_title}}},
    {safe: true, upsert: true},
    callback
  );
}
