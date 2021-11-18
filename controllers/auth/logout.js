const { User } = require("../../models");

// eslint-disable-next-line no-unused-vars
const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // console.log(req.user)
    await User.findByIdAndUpdate(_id, { token: null });

<<<<<<< Updated upstream
    res.json({
      status: "success",
=======
    res.status(204).res.json({
      status: 'success',
>>>>>>> Stashed changes
      code: 204,
      message: `✔️ Logout`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = logout;
