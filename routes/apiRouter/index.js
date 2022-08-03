const router = require("express").Router();

const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");
const commentRoutes = require("./commentRoute");
const profileRoutes = require("./profileRoute");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/profiles", profileRoutes);


module.exports = router;
