const { Post, Profile, User, Comment } = require("../models");

// Dashboard
const getDashboard = async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }, { model: Profile }],
    });

    const user = userData.get({ plain: true });
    // kiểm tra ko có profile thì để create, hoặc có thì để edit ở views
    let checkProfile;
    if (user.profile) {
      checkProfile = false;
    } else {
      checkProfile = true;
    }
    res.render("dashboard.handlebars", {
      ...user,
      checkProfile,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//New post:

const getCreateNewPost = async (req, res) => {
  try {
    res.render("post-manage.handlebars", {
      newPost: true,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEditPost = async (req, res) => {
  try {
    res.render("post-manage.handlebars", {
      newPost: false,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getEditPost, getCreateNewPost, getDashboard };
