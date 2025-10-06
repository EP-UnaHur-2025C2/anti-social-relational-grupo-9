'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey:{name:'userId', allowNull:false},
        as:'user',
        onDelete:'CASCADE'
      }),
      Post.hasMany(models.Post_Image, {
        foreignKey:{name:'postId', allowNull:false},
        as:'images',
        onDelete:'CASCADE'
      }),
      Post.hasMany(models.Comment, {
        foreignKey:{name:'postId', allowNull:false},
        as:'comments',
        onDelete:'CASCADE'
      }),
      Post.belongsToMany(models.Tag, {
        through:'Post_Tag',
        foreignKey:{name:'postId'},
        as:'tags'
      });
    }
  }
  Post.init({
    descripcion: {type:DataTypes.STRING, allowNull:false},
    creado: {type:DataTypes.DATEONLY, allowNull:false}
  }, {
    sequelize,
    modelName: 'Post',
    timestamps:false,
  });
  return Post;
};