'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.article)
    }
  };

  /*
  var Comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(comment, options) {
        comment.content = req.body.content.toLowerCase()
      },
      afterCreate: function(comment, options) {
        comment.name = req.body.name
      }
    }
  })
  */


  comment.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};