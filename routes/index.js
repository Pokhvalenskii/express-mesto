const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const login = require('./login');
const createUser = require('./createUsers');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/signin', login);
router.use('/signup', createUser);

module.exports = router;
