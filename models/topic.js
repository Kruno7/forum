'use strict';

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING,
         validate: {
             notEmpty: {
                 args: true,
                 msg: "Required"
            },
            is: {
                args: ["^[a-z0-9 _-]+$", 'i'],
                msg: "Only letters allowed and number"
            },
            len: {
                args: [2,32],
                msg: "String length is not in this range from 2 to 32"
           }
       }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
            args: true,
            msg: "Required"
      },
      is: {
          args: ["^[a-z0-9 _-]+$", 'i'],
          msg: "Only letters allowed and number"
      },
      len: {
          args: [3,255],
          msg: "String length is not in this range from 3 to 255"
      }
    }
  },
    userId: DataTypes.INTEGER
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.belongsTo(models.User, {foreignKey: 'userId', as: 'users'});
  };

  return Topic;
};