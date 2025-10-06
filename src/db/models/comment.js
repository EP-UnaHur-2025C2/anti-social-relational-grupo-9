const comment_visibility = parseInt(process.env.MAX_COMMENT_VISIBILITY_MONTH, 10) || 6;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    contenido: {type:DataTypes.STRING, allowNull:false},
    creado: {type:DataTypes.DATEONLY, allowNull:false},
    visible: {type:new DataTypes.VIRTUAL(DataTypes.BOOLEAN,['creado']),
    get:function() {
      return ((new Date() - new Date(this.get('creado')))/(1000*60*60*24*30)) < comment_visibility;
    }}
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps:false,
  });
  return Comment;
};