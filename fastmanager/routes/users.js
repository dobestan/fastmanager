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


passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(error, user){
      if (error) throw error;
      if(!user){
        return done(null, false, { message: username + " 에 해당하는 유저 정보를 찾을 수 없습니다." });
      }

      User.comparePassword(password, user.password, function(error, isMatch) {
        if (error) return done(error);
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
        }
      });
    });
  }
));


router.get("/login/", function(request, response) {
  return response.render("users/login");
});


router.post("/login/", passport.authenticate('local', {failureRedirect:'/login/', failureFlash: true}), function(request, response) {
    request.flash('success','성공적으로 로그인 되었습니다.');
    var userType = request.user.type;

    // FIXME: should return valid lectures view
    // return response.redirect('/'+userYype+'s/classes');
    return response.redirect("/");
});


router.get('/logout/', function(request, response) {
  request.logout();
  request.flash('success', "성공적으로 로그아웃 되었습니다.");
    return response.redirect('/');
});


module.exports = router;
