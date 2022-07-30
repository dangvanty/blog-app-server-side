const User = require("./userModel");
const Post = require("./postModel");
const Comment = require("./commentModel");
const Profile = require("./profileModel");

// User-Post relations
User.hasMany(Post, { foreignKey: "user_id" });

Post.belongsTo(User, { foreignKey: "user_id" });

//User-Profile
User.hasOne(Profile, { foreignKey: "user_id" });

Profile.belongsTo(User,{foreignKey:"user_id"});

// User-Comment relations
User.hasMany(Comment, { foreignKey: "user_id" });

Comment.belongsTo(User, { foreignKey: "user_id" });

// Post-Comment relations
Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });

Comment.belongsTo(Post, { foreignKey: "post_id" });

module.exports = { User, Post, Comment, Profile };
