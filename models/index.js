// Bring in the sub-class (MODEL: User)
const User = require('./User');
// Bring in the sub-class (MODEL: Blogpost)
const Blogpost = require('./Blogpost');
// Bring in the sub-class (MODEL: Blogpost)
const Comment = require('./Comment');

// Define association 
User.hasMany(Blogpost, {
    foreignKey: 'user_id',
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});
Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id'
});




// Export Them together in an Object
module.exports = { User, Blogpost, Comment };
