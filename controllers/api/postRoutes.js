const router = require('express').Router();
const { Blogpost, User, Comment } = require('../../models/');
const sequelize = require('../../config/connection');
const userAuth = require('../../utils/auth');

router.post('/add', userAuth, async (req, res) => {
    console.log(req.body);
    try {
        const newPostData = await Blogpost.create({
           title: req.body.title,
           post_body: req.body.post_body,
           user_id: req.session.user_id 
        });
        console.log(newPostData)
        res.json(newPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', userAuth, async (req, res) => {
    try {
        const postData = await Blogpost.update(req.body, {
            where: {
                id: req.params.id
            }
            
        }); 
        if (!postData) {
            res.status(404).json({ message: 'No post found with ID' })
        }
        res.json(postData);


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})



// Find One Post 
router.get('/:id', async (req, res) => {
    try {
        const postData = Blogpost.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'post_body', 'title', 'date'],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'date'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        if (!postData) {
            res.status(404).json({ message: 'no post found with that ID' });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router; 