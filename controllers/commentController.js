const { Comment } = require("../models");

//create new comment :
const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete comment:
const deleteCommentById = async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: `Comment does not exist to delete` });
      return;
    }
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createComment, deleteCommentById };
