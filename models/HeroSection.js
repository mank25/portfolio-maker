
module.exports = (sequelize, DataTypes) => {
    const HeroSection = sequelize.define('HeroSection', {
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
        name:{
            type:DataTypes.STRING,
            validate:{
                notEmpty: true,
            },
        },
        role:{
            type:DataTypes.STRING,
            validate:{
                notEmpty: true,
            },
        },
        HeroDescription:{
            type:DataTypes.TEXT,
            validate:{
                notEmpty: true,
            },
            
        },
        ProfileImageName:{
            type:DataTypes.TEXT,
            validate:{
                notEmpty: true,
            },
            
        },
        CvFileName:{
            type:DataTypes.TEXT,
            validate:{
                notEmpty: true,
            },
            
        },


    },
    {
        freezeTableName: true,
    });
    return HeroSection;
};
