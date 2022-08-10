const { Post, Profile, User, Comment } = require("../models");

//homepage:

const homePage = async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );

    res.render("homepage.handlebars", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get single post with comments

const getSinglePost = async (req, res, next) => {
  try {
    const checkPost = await Post.findOne({where: {id:req.params.id}})
    if(!checkPost){
      return res.render('404.handlebars')
    }
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
          include: [{ model: Profile }],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    let post = postData.get({ plain: true });
    console.log(post);

    let checkDeleteComment = req.session.user_id;
    //check delete
    post.comments.map((item) => {
      item.user_id === checkDeleteComment
        ? (item.checkDelete = true)
        : (item.checkDelete = false);
    });

    res.render("post.handlebars", {
      ...post,
      logged_in: req.session.logged_in,
    });

    // res.json({ ...post, logged_in: req.session.logged_in }); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
};

// login

const getLogin = (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login.handlebars");
};

const getSignUp = (req, res) => {
  res.render("signup.handlebars");
};

module.exports = { getSignUp, getLogin, getSinglePost, homePage };
