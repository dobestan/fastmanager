var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


router.get('/signup', function(request, response) {
  return response.render('users/signup');
});


router.post('/signup', function(request, response) {
  var username = request.body.username;
  var name = request.body.name;
  var email = request.body.email;

  var password = request.body.password;
  var password2 = request.body.password2;

  var type = request.body.type;

  request.checkBody('email', '이메일은 반드시 입력되어야 합니다.').notEmpty();
  request.checkBody('email', '이메일은 반드시 이메일 형식으로 되어있어야 합니다.').isEmail();
  request.checkBody('username', '아이디는 반드시 입력되어야 합니다.').notEmpty();
  request.checkBody('password', '비밀번호는 반드시 입력되어야 합니다.').notEmpty();
  request.checkBody('password2', '입력한 비밀번호가 일치하지 않습니다.').equals(password);

  errors = request.validationErrors();

  if (errors) {
    return response.render("users/signup", {
      errors: errors
    });
  }

  var newUser = new User({
    email: email,
    username: username,
    name: name,
    password: password,
    type: type
  });

  if (type == 'student') {
    var newStudent = new Student({
      username: username
    });

    User.saveStudent(newUser, newStudent, function(error, user) {
    });
  } else {  // type == 'teacher'
    var newTeacher = new Teacher({
      username: username
    });

    User.saveTeacher(newUser, newTeacher, function(error, user) {
    });
  }

  request.flash("success", "성공적으로 회원가입 되었습니다.");
  return response.redirect("/");
});


module.exports = router;
