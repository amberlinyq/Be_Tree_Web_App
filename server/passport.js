const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const GOOGLE_CLIENT_ID =
	'879869505607-daatrmkm8qp1mc31sv4841pe5endkhu0.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:8080/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
