const router = require('express').Router();
const {
  postUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.post('/', postUsers);
router.get('/', getUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
