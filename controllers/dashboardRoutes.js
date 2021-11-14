const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const userAuth = require('../utils/auth');


// GET - Find All POSTS from Current User 


// POST - Create new blogpost Route Handler
    // Map Over the Users POSTS,
    // Push a new one to the array
router.get('/add', async (req, res) => {
    try {
        res.render('new-post', { logged_in: true });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        } 
});

router.get('/edit/:id', async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



// PUT - Update Exisiting blogpost Route Handler
    // Find by ID 
        // If title is different, replace with req.body.title 
        // If post_body is different, replace with req.body.post_body



// DELETE - Destroy a Post Route Handler
// try {

        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json(err);
        // }


// Get all User Blogposts 
router.get('/', userAuth, async (req, res) => {
    try {
        const dashboardData = await Blogpost.findAll({
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
        });
        const blogposts = dashboardData.map(el => el.get({ plain: true }));
        res.render('dashboard', { blogposts, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/edit/:id', userAuth, (req, res) => {
//     Blogpost.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: ['id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [{
//                     model: User,
//                     attributes: ['name']
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['name']
//                     }
//                 }
//             ]
//         })
//         .then(postData => {
//             if (!postData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }

//             const post = postData.get({ plain: true });
//             res.render('edit-post', { post, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })




module.exports = router;

