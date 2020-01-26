const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');
const routes = require('./routes');

const passportConfig = require('./passport');

const app = express();
db.sequelize.sync({  });
dotenv.config();
const port = process.env.PORT || 4000;
passportConfig();

app.use(cors({
  origin: 'https://www.delog.net',
  credentials: true,
}));

app.use('/', express.static('uploads'));
app.use('/profile/', express.static('uploads/profileImage'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes)

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});


app.listen(port, () => {
  console.log(`백엔드 서버 ${port}번 포트에서 작동중.`);
});
