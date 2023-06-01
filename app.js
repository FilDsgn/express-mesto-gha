const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const router = require('./routes/router');

const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '64635c30053cacc559ad36b6',
//   };
//   next();
// });

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
