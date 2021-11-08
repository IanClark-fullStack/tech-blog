const { Model, DataTypes, NOW } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        date: {
            type: DataTypes.DATE,
            defaultValue: NOW,
            validate: {
                isDate: true,
            },
        },
        content: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog_post',
                key: 'id'
            },
        }
    },
    // Post_body Table Options
    {
        sequelize,
        timestamps: false, // Use for Date Now?
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;