var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Student = require('./../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Student.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        return cb(null, student);
      } else {
        // we have a new student via OAuth!
        var newStudent = new Student({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// being assigned to req.user by passport
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});