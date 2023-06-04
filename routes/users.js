const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationGetUserById,
} = require('../middlewares/validations');

userRoutes.get('/', getUsers);
userRoutes.patch('/me', validationUpdateUser, updateUser);
userRoutes.patch('/me/avatar', validationUpdateAvatar, updateAvatar);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', validationGetUserById, getUserById);

module.exports = userRoutes;
