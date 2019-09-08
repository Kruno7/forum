'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "Only letters allowed"
      },
        len: {
            args: 3,
            msg: "First name must be atleast 3 characters in length"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "Only letters allowed"
      },
        len: {
            args: 3,
            msg: "Last name must be atleast 3 characters in length"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
    unique: true,
    validate: {
      len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
      },
      isEmail: {
          msg: "Email address must be valid"
      }
    }
  },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
            args: true,
            msg: "Required"
      },
      len: {
          args: 8,
          msg: "Password must be at least 8 characters long"
      }
    }
  }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Topic,  {as: 'topics'});
    User.hasMany(models.Comment,  {as: 'comments'});
  };
  

  return User;
};