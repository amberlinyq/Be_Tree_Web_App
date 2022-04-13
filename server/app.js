const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
module.exports = app;
//client: 879869505607-daatrmkm8qp1mc31sv4841pe5endkhu0.apps.googleusercontent.com
//client secret: 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
// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

app.use(
	cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	})
);

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found');
		err.status = 404;
		next(err);
	} else {
		next();
	}
});

// sends index.html
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});
