const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Include the compareSync bcrypt functionality. 
    comparePassword(stringPassword) {
        // Return the boolean value of invoking bcyrpt method to compare hashed-version w/ string v. 
        return bcrypt.compareSync(stringPassword, this.pass);
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    // Table Options
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.pass = await bcrypt.hash(newUserData.pass, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                newUserData.pass = await bcrypt.hash(updatedUserData.pass, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',

    }
);

module.exports = User;