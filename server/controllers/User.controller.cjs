const user = require("../models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

class UserController {

  static async getCurrentUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userLogin = decodedToken.login;
      const userData = await user.findOne({
        login: userLogin,
      });
      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const filteredUserData = {
        name: userData.name,
        lastName: userData.lastName,
        surname: userData.surname,
      };
      return res.status(200).json({ userData: filteredUserData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Произошла ошибка при получении пользователя" });
    }
  }

  static async create(req, res) {
    try {
      const { name, lastName,surname, login, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password + process.env.SECRET_KEY, 5);
      const newUser = await user.create({
        name,
        lastName,
        surname,
        login,
        password: hashedPassword,
      });
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.json("create error");
    }
  }
}

module.exports = UserController;
