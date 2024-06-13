const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {

    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const regData = req.body;

    try {
        const token = await authService.register(regData);

        res.cookie('auth', token);
        res.redirect('/');


    } catch (error) {
        res.render('auth/register', { ...regData, error });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const token = await authService.login(loginData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('auth/login', { ...loginData, error });
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;