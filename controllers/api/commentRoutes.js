const router = require('express').Router();
const { Comment } = require('../../models');
const userAuth = require('../../utils/auth');

router.post('/', userAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id
        });
        console.log(commentData);
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;