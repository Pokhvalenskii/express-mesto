const router = require('express').Router();

const auth = require('../middlewares/auth');
const checkError = require('../middlewares/error');
const notFound = require('../middlewares/notFound');
const userRouter = require('./users');
const cardRouter = require('./cards');
const login = require('./login');
const createUser = require('./createUsers');
const { reqLogger, errLogger } = require('../middlewares/logger');
// const { route } = require('./users');

router.use(reqLogger);

router.use('/signin', login);
router.use('/signup', createUser);
router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);
router.use('*', notFound);

router.use(errLogger);

router.use(checkError);

module.exports = router;
