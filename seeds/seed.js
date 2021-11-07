const sequelize = require('../config/connection');
const { User, Blogpost } = require('../models');

const userSeedData = require('./userData.json');
const blogpostSeedData = require('./blogPost.json');

