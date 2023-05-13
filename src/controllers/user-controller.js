const { UserService } = require("../services/index");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: user,
      success: true,
      message: "Succesfully created user !",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a user",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userService.deleteUser(req.params.id);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Succesfully deleted user !",
      arr: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to delete a user",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
};
