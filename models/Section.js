
module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'User',
                key: 'username',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        HeroSec: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },

    {
        freezeTableName: true,
    });
    return Section;
};
