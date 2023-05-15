const { UserRepository } = require("../repository/index");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.userRepository.deleteUser(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_ACCESS_TOKEN);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      const result = bcrypt.compareSync(
        userInputPlainPassword,
        encryptedPassword
      );
      return result;
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
