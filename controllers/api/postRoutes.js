const router = require('express').Router();
const { Blogpost, User, Comment } = require('../../models/');
const sequelize = require('../../config/connection');
const userAuth = require('../../utils/auth');

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