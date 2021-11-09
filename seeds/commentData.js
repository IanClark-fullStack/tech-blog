const { Comment } = require('../models');
const commentData =
[
    {
        "content": "Bugs or features",
        "user_id": 4,
        "blogpost_id": 1
    },
    {
        "content": "NaN is NaN",
        "user_id": 3,
        "blogpost_id": 2
    },
    {
        "content": "I could less about money. I just want herman miller.",
        "user_id": 2,
        "blogpost_id": 3
    },
    {
        "content": "local ghostttt",
        "user_id": 1,
        "blogpost_id": 4
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;