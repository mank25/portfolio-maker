module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        freezeTableName: true,
        hooks: {
            afterCreate: async (user, options) => {
                await sequelize.models.Section.create({
                    username: user.username,
                    HeroSec: true,
                });
                await sequelize.models.HeroSection.create({
                    username: user.username,
                });
            },
        },
    });

    return User;
};
