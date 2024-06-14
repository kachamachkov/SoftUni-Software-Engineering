const router = require('express').Router();
const { getErrorMessage } = require('../lib/getErrorMessage');
const stonesService = require('../services/stonesService');
const { isAuth } = require('../middlewares/authMiddleware');
const Stones = require('../models/Stones');


router.get('/create', isAuth, (req, res) => {
    res.render('stones/create');
});


router.post('/create', isAuth, async (req, res) => {

    const stonesData = req.body;

    try {
        await stonesService.create(req.user._id, stonesData);

        res.redirect('/stones/dashboard');


    } catch (err) {
        res.render('stones/create', { ...stonesData, error: getErrorMessage(err) });
    }
});

router.get('/dashboard', async (req, res) => {

    const stones = await stonesService.getAll().lean();

    res.render('stones/dashboard', { stones });
});


router.get('/search', (req, res) => {
    res.render('stones/search');
});


router.get('/details/:gemstoneId', async (req, res) => {

    const gemstone = await stonesService.getOne(req.params.gemstoneId).lean();

    const isOwner = gemstone.owner._id == req.user?._id;
    const isLiked = gemstone.likedList.some(user => user._id == req.user?._id);

    res.render('stones/details', { ...gemstone, isOwner, isLiked });
});

module.exports = router;