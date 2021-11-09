const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models');
const userAuth = require('../utils/auth');
// GET ALL - Blogposts to Populate the homepage. 
router.get('/', async (req, res) => {
    try {
        const userLoginData = await Blogpost.findAll({
            include: [User],
        });
        // Map over users array and serialize data 
        const blogArray = userLoginData.map((el) => el.get({ plain: true}));
        console.log(blogArray);

        // Res.render the TODO : ALTERNATE PAGE TO DISPLAY DASHBOARD. 
        res.render('homepage', { blogArray, logged_in: req.session.logged_in});
            // Pass logged in flag 
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET A USERS POSTS - Find by Pk 
router.get('/blogpost/:id', userAuth, async (req, res) => {
    try {
        const blogpostData = await Blogpost.findOne({
            where: {id: req.params.id},
            include: [
                User, 
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        // If we recieved the app data, serialize it and render a blogpost view, 
        if (blogpostData) {
            const singleBlogpost = blogpostData.get({ plain: true });
            console.log(`found blog post for ${singleBlogpost.id}`);
            res.render('single-blogpost', {blogpostData, logged_in: req.session.logged_in});
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});




module.exports = router;