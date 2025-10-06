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