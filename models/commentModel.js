const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    post_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "post", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
