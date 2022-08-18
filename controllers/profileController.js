const { Profile,User } = require("../models");

//add Profile
const createProfile = async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProfile);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProfileById = async (req, res) => {
  try {
    const profileData = await Profile.findOne({
      where: { user_id: req.session.user_id },
    });
    const profile = profileData.get({ plain: true });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateProfileById = async (req, res) => {
  try {
    const profileData = await Profile.update(req.body, {
      where: { user_id: req.session.user_id },
    });
    if (!profileData[0]) {
      res.status(404).json({
        message: "Profile does not exist to update",
      });
      return;
    }
    res.status(200).json({
      msg: "success",
      profileData,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const disableUser = async (req, res) => {
  try {
  await User.destroy({
    where: {
      id:req.session.user_id
    },
    force: false
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

module.exports = { createProfile, getProfileById, updateProfileById,disableUser };
