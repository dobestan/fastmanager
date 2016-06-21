var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teacherSchema = Schema({
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


var Teacher = module.exports = mongoose.model('Teacher', teacherSchema);


module.exports.getTeacherByUsername = function(username, callback){
  var query = {username: username};
  Teacher.findOne(query, callback);
}


module.exports.register = function(info, callback) {
  teacher_username = info['teacher_username'];
  lecture_id = info['lecture_id'];
  lecture_title = info['lecture_title'];

  var query = {username: teacher_username};

  Teacher.findOneAndUpdate(
    query,
    {$push: {"lectures": {lecture_id: lecture_id, lecture_title: lecture_title}}},
    {safe: true, upsert: true},
    callback
  );
}
