const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('home');
});

// TODO: test authorization
router.get('/authorize-test', isAuth, (req, res) => {
    res.send('You are authorized');
});




module.exports = router;