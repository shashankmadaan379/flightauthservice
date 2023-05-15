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

  async signIn(email, plainPassword) {
    try {
      //step 1--- fetch the user using email
      const user = await this.userRepository.getByEmail(email);
      //step2---> compare incoming plain password with stored encrypted password

      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password Doesn't Match");
        throw { error: "Incorrect Password" };
      }
      //step3--> if password match then create a token and send it to the user
      const newToken = await this.createToken({
        email: user.email,
        id: user.id,
      });
      return newToken;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
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
