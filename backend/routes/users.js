const userRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  userCreationJoiScheme,
  userUpdateJoiScheme,
  avatarUpdateJoiScheme,
  userParamsJoiScheme,
} = require('../validation/joiSchemes');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', celebrate(userCreationJoiScheme), getCurrentUser);
userRoutes.get('/:userId', celebrate(userParamsJoiScheme), getUserById);
userRoutes.patch('/me', celebrate(userUpdateJoiScheme), updateUser);
userRoutes.patch('/me/avatar', celebrate(avatarUpdateJoiScheme), updateAvatar);

module.exports = userRoutes;
