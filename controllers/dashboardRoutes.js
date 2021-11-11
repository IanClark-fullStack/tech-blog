const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogost, User, Comment } = require('../models');
const userAuth = require('../utils/auth');
// GET - Find All POSTS from Current User 
// POST - Create new blogpost Route Handler
    // Map Over the Users POSTS,
    // Push a new one to the array


// PUT - Update Exisiting blogpost Route Handler
    // Find by ID 
        // If title is different, replace with req.body.title 
        // If post_body is different, replace with req.body.post_body



// DELETE - Destroy a Post Route Handler

router.get('/', withAuth, (req, res) => {
    Blogpost.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'post_body',
                'date'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'date'],
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
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/edit/:id', withAuth, (req, res) => {
    Blogpost.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = postData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;

