const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', getUserById);

module.exports = userRoutes;
