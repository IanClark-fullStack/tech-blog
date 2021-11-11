const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models');
const userAuth = require('../utils/auth');
// GET ALL - Blogposts to Populate the homepage. 
router.get('/', async (req, res) => {
    try {
        const userLoginData = await Blogpost.findAll({
            attributes: ['id', 'title', 'post_body', 'date'], 
            include: [
                {
                    model: Comment,
                    attributes: ['date', 'content', 'user_id', 'blogpost_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        // Map over users array and serialize data 
        const blogposts = userLoginData.map(el => el.get({ plain: true}));
        console.log(blogposts);
        res.render('homepage', { blogposts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});


// GET A USERS POSTS - Find by Pk 
router.get('/blogpost/:id', async (req, res) => {
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

// Part 2 of the Login link, 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard'); 
        return;
    }
    res.render('login'); // Render login.handlebars in MAIN
});
// Step 4 :: Main.handlebars Login link > homeRoutes /login route > Renders Login Form > Or signup link (routes back) 
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup'); // Render signup.handlebars in MAIN
});

module.exports = router;