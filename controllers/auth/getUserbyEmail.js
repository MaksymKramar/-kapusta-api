const { User } = require("../../models");

const getUserbyEmail = async (req, res) => {
  //   try {
  //     const { useremail } = req.params;
  //     console.log(useremail);
  //     const currentUser = await User.findOne({ email: useremail });
  //     console.log(currentUser);
  //     if (currentUser) {
  //       res.status(200).json({
  //         name: currentUser.name,
  //         email: currentUser.email,
  //         balance: currentUser.balance,
  //         token: currentUser.token,
  //       });
  //     } else {
  //       res.status(400).json({
  //         staus: "error",
  //         code: "400",
  //         message: "Wrong email",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(400).json(next(error));
  //   }
  // };

  const { useremail } = req.params;
  const currentUser = await User.findOne({ email: useremail });

  if (currentUser) {
    res.status(200).json({
      name: currentUser.name,
      email: currentUser.email,
      balance: currentUser.balance,
      token: currentUser.token,
    });
  } else {
    res.status(400).json({
      staus: "error",
      code: "400",
      message: "Wrong email",
    });
  }
};

module.exports = getUserbyEmail;
