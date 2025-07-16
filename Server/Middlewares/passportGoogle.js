const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/UserDetailsModels/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_G,
      clientSecret: process.env.CLIENT_SECRET_G,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Try finding user by Google ID
        let user = await User.findOne({ googleId: profile.id });

        // 2. If not found by googleId, try matching by email
        if (!user) {
          const email = profile.emails[0].value;
          user = await User.findOne({ email });

          if (user) {
            // ✅ User exists but not linked with Google yet — update googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // ❌ No user at all — create new user
            user = new User({
              username: profile.displayName,
              email,
              googleId: profile.id,
            });
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


// Optional: for sessions (can skip if using JWT only)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
