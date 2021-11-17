const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const userAuth = require('../utils/auth');