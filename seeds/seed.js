const sequelize = require('../config/connection');
// Bring in JSON Data 
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');
const {User, Comment, Post} = require('../models');

const seedDb = async () => {
    // Await returned value from invoking sequelize promise based version of drop table if exists 
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedPosts();
    await seedComments();
    // In case an error arises, tell node not to exit 
    process.exit(0);
};

// const seedDb = async () => {
    
//     // Await return value of sequelize bulkCreate using User model
    
//      // Await return value of sequelize bulkCreate using Blogpost model 
//     const blogPostSeedsAdded = await Blogpost.bulkCreate(blogPostSeedData);
//     // Await return value of sequelize bulkCreate using Comment model 
//     const commentSeedsAdded = await Comment.bulkCreate(commentSeedData);
    
// };

seedDb(); // SeedDb invocation 




