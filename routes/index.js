const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const login = require('./login');
const createUser = require('./createUsers');
const auth = require('../middlewares/auth');
const checkError = require('../middlewares/error');

router.use('/signin', login);
router.use('/signup', createUser);

router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use(checkError);

module.exports = router;
