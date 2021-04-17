const router = require('express').Router();
const { signInUser } = require('../controllers/users');

router.post('/', signInUser);

module.exports = router;
