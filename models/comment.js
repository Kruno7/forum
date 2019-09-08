'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
        validate: {
          notEmpty: {
              args: true,
              msg: "Required"
        },
        is: {
            args: ["^[a-z0-9 _-]+$", 'i'],
            msg: "Only letters allowed"
        },
        len: {
            args: [1,50],
            msg: "String length is not in this range from 1 to 50"
        }
      }
  },
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'users'});
    Comment.belongsTo(models.Topic, {foreignKey: 'topicId', as: 'topics'});
  };
  
  return Comment;
};