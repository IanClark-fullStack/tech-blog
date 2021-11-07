const { Model, Datatypes } = require('sequelize');
const bcrypt = require('bcyrpt');
const sequelize = require('../config/connection');

class User extends Model {
    // Include the compareSync bcrypt functionality. 
    
}

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false, 
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true
            },
        },
        pass: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    // Table Options
    {
        hooks: {
            beforeCreate: async (hashUser) => {
                hashUser.pass = await bcrypt.hash(hashUser.pass, 10);
                return hashUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',

    }
);