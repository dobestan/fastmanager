var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');
var async = require('async');


var userSchema = Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  password:{
    type:String,
    bcrypt: true
  },
  email: {
    type: String
  },
  type:{
    type:String
  }
});


var User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}


module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(error, isMatch){
    if (error) throw error;

    callback(null, isMatch);
  });
}


module.exports.saveStudent = function(newUser, newStudent, callback){
  bcrypt.hash(newUser.password, 10, function(error, hash){
    if (error) throw error;

    newUser.password = hash;
    async.parallel([newUser.save, newStudent.save], callback);
  });
}


module.exports.saveTeacher = function(newUser, newTeacher, callback){
  bcrypt.hash(newUser.password, 10, function(error, hash){
    if (error) throw error;

    newUser.password = hash;
    async.parallel([newUser.save, newTeacher.save], callback);
  });
}
