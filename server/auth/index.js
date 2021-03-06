const router = require('express').Router();
const passport = require('passport');
const {
	models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
	try {
		res.send({ token: await User.authenticate(req.body) });
	} catch (err) {
		next(err);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.send({ token: await user.generateToken() });
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

router.get('/me', async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (ex) {
		next(ex);
	}
});

const CLIENT_URL = 'http://localhost:8080/';
router.get('/login/success', (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: 'successfull',
			user: req.user,
			//   cookies: req.cookies
		});
	}
});
router.get('/login/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: 'failure',
	});
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: CLIENT_URL,
		failureRedirect: '/login/failed',
	})
);
