const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    User.findOne({ 'google.id': profile.id }).then((currentUser) => {

      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          google: {
            id: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value
          },
          goingList: []
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }

    });
  })
);
