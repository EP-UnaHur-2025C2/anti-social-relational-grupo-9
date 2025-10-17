'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey:{name:'userId', allowNull:false},
        as:'posts',
        onDelete:'CASCADE'
      }),
      User.hasMany(models.Comment, {
        foreignKey:{name:'userId', allowNull:false},
        as:'comments',
        onDelete:'CASCADE'
      });
      //interpretacion de as:'followers' y foreignKey:'followedId'
      //si quiero traer los seguidores (followers) del user 1
      //tengo que buscar el 1 en quienes son seguidos (followedId)
      //y traer los ids de la columna seguidores (followerId) q coincidan
      User.belongsToMany(models.User, {
        through:models.Follow,
        as:'followers',
        foreignKey:{name:'followedId'},
        otherKey:{name:'followerId'},
        timestamps:false
      });
      //interpretacion de as:'followings' y foreignKey:'followerId'
      //si quiero traer los seguidos (followings) por el user 1
      //tengo que buscar el 1 en los seguidores (followerId)
      //y traer los ids de la columna seguidos (followedId) q coincidan
      User.belongsToMany(models.User, {
        through:models.Follow,
        as:'followings',
        foreignKey:{name:'followerId'},
        otherKey:{name:'followedId'},
        timestamps:false
      });
    }
  }
  User.init({
    nickName: {type:DataTypes.STRING, unique:true, allowNull:false},
    fechaNacimiento: {type:DataTypes.DATEONLY, allowNull:false},
    email: {type:DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false,
  });
  return User;
};