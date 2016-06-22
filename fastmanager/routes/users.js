var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


router.get('/signup', function(request, response) {
});


router.post('/signup', function(request, response) {
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
  }
));


router.get("/login/", function(request, response) {
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
