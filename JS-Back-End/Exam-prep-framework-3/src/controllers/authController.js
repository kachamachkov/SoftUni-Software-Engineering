const router = require('express').Router();
const authService = require('../services/authService');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const userData = req.body;

    await authService.regiter(userData);

    res.redirect('/login')
});

router.get('/login', (req,res) =>{
    res.render('auth/login')
})











module.exports = router;