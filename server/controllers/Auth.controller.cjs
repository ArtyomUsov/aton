const user = require("../models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

class AuthController {
  static async auth(req, res) {
    const { login, password } = req.body;
    const foundUser = await user.findOne({ login });
    if (!foundUser) {
      return res.status(404).json("Пользователь с таким логином не найден");
    }
    const validate = bcrypt.compareSync(password + process.env.SECRET_KEY, foundUser.password);
    if (!validate) {
      return res.status(400).json("Неверный пароль");
    }
    if (foundUser && validate) {
      console.log("Авторизация прошла успешно");
      const newToken = jwt.sign(
        {
          name: foundUser.name,
          lastName: foundUser.lastName,
          login: foundUser.login,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json(`Bearer ${newToken}`);
    } else return res.status(401).json("Вы не авторизованы");
  }
}

module.exports = {
  auth: AuthController.auth,
};
