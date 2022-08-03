const {User, Post, Comment, Profile} = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op


const showListUsers = async (req, res) => {
  const { page, size, sort, type, search } = req.query;
  let order = {};
    if (sort) {
      order.order = [[Sequelize.literal(sort), type]];
    }

  let searchname = ""
  if (search) {
    searchname = search
  }

  let pageNumber = 0;
  if (+page > 0) {
    pageNumber = page - 1;
  }

  let sizeNumber = 5;
  if (+page>0) {
    if (size > 0 && size < 5) {
      sizeNumber = size;
    }
  }

  const listUser = await User.findAndCountAll(
    {
      attributes: {
        include: [
          [
            Comment.sequelize.literal(`(
            SELECT COUNT(*)
            FROM comment 
            WHERE
                comment.user_id = user.id
        )`),
            'commentCount'
          ],
          [
            Post.sequelize.literal(`(
            SELECT COUNT(*)
            FROM post
            WHERE
                post.user_id = user.id
        )`),
            'postCount'
          ],
          [
            User.sequelize.literal(`(
          SELECT COUNT(*)
          FROM user join profile where profile.fullname like '%${searchname}%'
      )`),
            'userCount'
          ],
        ],
        exclude:["password",]
      },

      include: [{model:Post}, {model:Comment},{model:Profile}],
      group: ["user.id"],
      ...order,
      limit: sizeNumber,
      offset: pageNumber * sizeNumber,
      subQuery: false,
    });

  let queryObject = {
    page: pageNumber + 1,
    size: sizeNumber,
    sort,
    search
  };
  console.log(listUser)
  res.json({
    data: { ...listUser, queryObject },
  })
}

module.exports= {showListUsers}