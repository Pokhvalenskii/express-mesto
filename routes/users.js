const router = require('express').Router();
const {postUsers , getUserl, getUserById, updateUser, updateAvatar} = require('../controllers/users')

router.post('/', postUsers);
router.get('/', getUserl);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar)

module.exports = router;