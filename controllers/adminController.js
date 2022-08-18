const { User, Post, Comment, Profile } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const showListUsers = async (req, res) => {
  const { page, size, sort, type, search } = req.query;
  let order = {};
  if (sort) {
    order.order = [[Sequelize.literal(sort), type]];
  }

  let searchname = "";
  if (search) {
    searchname = search;
  }

  let pageNumber = 0;
  if (+page > 0) {
    pageNumber = page - 1;
  }

  let sizeNumber = 5;
  if (+page > 0) {
    if (size > 0 && size < 5) {
      sizeNumber = size;
    }
  }

  const listUser = await User.findAndCountAll({
    attributes: {
      include: [
        [
          Comment.sequelize.literal(`(
            SELECT COUNT(*)
            FROM comment 
            WHERE
                comment.user_id = user.id
        )`),
          "commentCount",
        ],
        [
          Post.sequelize.literal(`(
            SELECT COUNT(*)
            FROM post
            WHERE
                post.user_id = user.id
        )`),
          "postCount",
        ],
        [
          User.sequelize.literal(`(
          SELECT COUNT(*)
          FROM user join profile on user.id=profile.user_id where profile.fullname like '%${searchname}%'
      )`),
          "userCount",
        ],
      ],
      exclude: ["password"],
    },

    include: [
      { model: Post },
      { model: Comment },
      {
        model: Profile,
        where: { fullname: { [Op.like]: "%" + searchname + "%" } },
      },
    ],
    group: ["user.id"],
    ...order,
    limit: sizeNumber,
    offset: pageNumber * sizeNumber,
    paranoid: false,
    subQuery: false,
  })

  let queryObject = {
    page: pageNumber + 1,
    size: sizeNumber,
    sort,
    search,
  };

  let newlist = JSON.parse(JSON.stringify(listUser));
  res.render("admin.ejs", {
    data: { ...newlist, queryObject },
    logged_in: req.session.logged_in,
  });
};

const createUser = async (req, res) => {
  try {
    const {username, password, fullname, tel, skill, address, role} = req.body;

    await User.create({
      username:username,
      password:password,
      role:role
    })
    const userEnd = await User.findOne({order:[['created_at','DESC']], limit:1})
    await Profile.create({
      fullname:fullname,
      tel:tel,
      address:address,
      skills:skill,
      user_id:userEnd.id
    })
    res.status(200).json({
      success: true,
      
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
};

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
  await User.destroy({
    where: {
      id: id,
    },
    force: true
  })
  res.status(200).json({
    success:true
  });
  } catch (error) {
    res.status(400).json({
      success:false,
      error
    })
  }
};

const editUser = async (req, res) => {
  try{const { id } = req.params
  const userEdit = await User.findOne({
    where: { id: id },
    include:[{ model: Profile },]

  })
  console.log(userEdit)
  res.status(200).json(
    {
      success: true,
      userEdit
    });
  }
    catch(error){
      res.status(400).json(
        {
          success: false,
          error
        });
    }

}


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {username, fullname, tel, skill, address, role} = req.body;
 
  await User.update({
    username:username,
    role:role
  },  { where: { id: id } }
  )
  await Profile.update({
    fullname:fullname,
    tel:tel,
    address:address,
    skills:skill,
  },{where:{user_id:id}})

  res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json( {
      success: false,
      error
    })
  }
 
}

module.exports = { showListUsers, createUser,deleteUser,editUser,updateUser };
