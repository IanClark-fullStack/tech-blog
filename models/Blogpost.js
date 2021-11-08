const { Model, DataTypes, NOW } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        post_body: {
            type: DataTypes.STRING(3500),
            allowNull: false
        },
        // inserting a UTC Date object into DATEONLY will cut timezone off, 
        date: {
            type: DataTypes.DATE,
            defaultValue: NOW,
            validate: {
                isDate: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
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