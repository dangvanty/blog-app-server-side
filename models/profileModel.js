const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    underscored: true,
    modelName: "profile",
  }
);

module.exports = Post;
