const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isCourseOwner } = require('../middlewares/courseMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../util/errorUtils');


router.get('/', async (req, res) => {

    // arr from docs to become arr of objects
    const courses = await courseService.getAll().lean();


    res.render('courses/catalog', { courses });
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOneDetailed(req.params.courseId).lean();

    const signedUpUsers = course.signUpList.map(usr => usr.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;
    const isSigned = course.signUpList.some(user => user._id == req.user?._id);

    res.render('courses/details', { ...course, signedUpUsers, isOwner, isSigned });
});

router.get('/:courseId/sign-up', async (req, res) => {
    await courseService.signUp(req.params.courseId, req.user._id);

    res.redirect(`/courses/${req.params.courseId}/details`);
});


router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);

        res.redirect('/courses');

    } catch (err) {
        res.render('courses/create', { ...courseData, error: getErrorMessage(err) });

    }
});


router.get('/:courseId/delete', isCourseOwner, async (req, res) => {
    await courseService.delete(req.params.courseId);

    res.redirect('/courses');
});

router.get('/:courseId/edit', isCourseOwner, async (req, res) => {
    res.render('courses/edit', { ...req.course });

});

router.post('/:courseId/edit', isCourseOwner, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.edit(req.params.courseId, courseData);

        res.redirect(`/courses/${req.params.courseId}/details`);

    } catch (err) {
        res.render('courses/edit', { ...courseData, error: getErrorMessage(err) });
    }
});



module.exports = router;