const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('provider', 'owner'),
        allowNull: false,
    },
}, {
    tableName: 'users', // Match the database table name
    timestamps: true,   // Adds createdAt and updatedAt columns
});

module.exports = User;
