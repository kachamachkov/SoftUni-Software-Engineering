const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    // parse form via configExpress file
    const newMovie = req.body;

    try {

        // resolve promise
        await movieService.create(newMovie);

        res.redirect('/create');

    } catch (err) {
        console.log(err.message);
        res.redirect('/create');
    }


});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    // this is not good practice, use handlebars helpers
    movie.rating = new Array(Number(movie.rating)).fill(true);
    res.render('details', { movie });
});

module.exports = router;