const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/router');

const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

app.use(express.json());

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use('/', router);

app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
