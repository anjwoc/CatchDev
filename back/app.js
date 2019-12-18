const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');
const routes = require('./routes')

const passportConfig = require('./passport');


const app = express();

db.sequelize.sync({  });
dotenv.config();
passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/', express.static('uploads'));
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
app.get('/test', async (req, res) => {
  try{
    const post = await db.Board.findOne({
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
     });
    res.json(post);
  }catch(err){
    console.error(err);
    next(err);
  }
})

app.listen(4000, () => {
  console.log(`백엔드 서버 ${app.get.PORT}번 포트에서 작동중.`);
});
