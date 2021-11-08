const sequelize = require('../config/connection');
const { User, Blogpost } = require('../models');
// Bring in JSON Data 
const userSeedData = require('./userData.json');
const blogPostSeedData = require('./blogPost.json');

const seedDb = async () => {
    // Await returned value from invoking sequelize promise based version of drop table if exists 
    await sequelize.sync({ force: true });

    // Await return value of sequelize bulkCreate using User model 
    const userSeedsAdded = await User.bulkCreate(userSeedData, {
        // Include hooks, 
        individualHooks: true, 
        returning: true,
    });
    // Await return value of sequelize bulkCreate using Blogpost model 
    const blogPostSeedsAdded = await Blogpost.bulkCreate(blogPostSeedData);
    
    // In case an error arises, tell node not to exit 
    process.exit(0);
};

seedDb(); // SeedDb invocation 




