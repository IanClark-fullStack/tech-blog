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
        // Render dash?
        

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});



router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Blogpost.findOne({
                where: {
                    id: req.params.id
                },
                attributes: [
                    'id',
                    'post_body',
                    'title',
                    'date'
                ],
                include: [{
                    model: Comment, 
                    attributes: ['id', 'content', 'blogpost_id', 'user_id', 'date'],
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ],
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const singlePost = postData.get({ plain: true });
        const commentData = singlePost.comments.map(el => el.content);
        console.log(commentData);
        res.render('single-blogpost', { singlePost, commentData, logged_in: req.session.logged_in });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/posts-comments', async (req, res) => {
    try {
        const postData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'date'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'content', 'blogpost_id', 'user_id', 'date'],
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
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });

        res.render('single-blogpost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }   
});

module.exports = router;