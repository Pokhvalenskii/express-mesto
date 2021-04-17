const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const login = require('./login');
const createUser = require('./createUsers');
const auth = require('../middlewares/auth');

router.use('/cards', cardRouter);
router.use('/signin', login);
router.use('/signup', createUser);

router.use(auth);
router.use('/users', userRouter);

module.exports = router;
