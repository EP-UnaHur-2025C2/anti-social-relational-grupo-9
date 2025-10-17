'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.User, {
        as: 'follower',
        foreignKey: 'followerId'
      }),
      Follow.belongsTo(models.User, {
        as: 'followed',
        foreignKey: 'followedId'
      })
    }
  }
  Follow.init({
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    followedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Follow',
    timestamps: false
  });
  return Follow;
};