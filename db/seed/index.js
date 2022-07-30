require("dotenv").config();
const sequelize = require("../../config/config.js");

const { User, Post, Comment, Profile } = require("../../models");

const userData = require("./seed-user.json");
const postData = require("./seed-posts.json");
const commentData = require("./seed-comments.json");
const profileData = require('./seed-profile.json');

async function seedDatabase() {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(userData, { individualHooks: true });
    console.log("\n----- USERS SEEDED -----\n");

  await Post.bulkCreate(postData);
  console.log("\n----- POSTS SEEDED -----\n");

  await Comment.bulkCreate(commentData);
  console.log("\n----- COMMENTS SEEDED -----\n");

  await Profile.bulkCreate(profileData);
  console.log("\n----- PROFILE SEEDED -----\n");

  process.exit(0);
}

seedDatabase();
