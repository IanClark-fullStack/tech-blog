// Bring in the sub-class (MODEL: User)
const User = require('./User');
// Bring in the sub-class (MODEL: Blogpost)
const Blogpost = require('./Blogpost');

// Define association 
Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
});



// Export Them together in an Object
module.exports = { User, Blogpost };
