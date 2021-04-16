const router = require('express').Router();
const {
  createUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.post('/', createUsers);
router.get('/', getUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
