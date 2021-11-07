const { Model, Datatypes, NOW } = require('sequelize');
const { Blogpost } = require('.');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
    {
        id: {
            type: Datatypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING(70),
            allowNull: false
        },
        post_body: {
            type: Datatypes.STRING(3500),
            allowNull: false
        },
        // inserting a UTC Date object into DATEONLY will cut timezone off, 
        date: {
            type: Datatypes.DATE,
            defaultValue: NOW,
            validate: {
                isDate: true,
            },
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },

    },
    // Post_body Table Options
    {
        sequelize,
        timestamps: false, // Use for Date Now?
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_post'
    }
);

module.exports = Blogpost;

/*
Try using timestamps true to extract date values 

*/

// date: {
//     type: Datatypes.TIMESTAMP,
//     defaultValue: Datatypes.('CURRENT_TIMESTAMP'),
//     allowNull: false,
//     validate: {
//         isDate: true,
//     },
// },