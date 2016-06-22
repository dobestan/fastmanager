var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
