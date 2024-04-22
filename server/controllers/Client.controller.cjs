const client = require("../models/client.model.cjs");
const user = require("../models/user.model.cjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

class ClientController {
  static async getClientsByUserId(req, res) {
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
      const userId = userData._id;
      const clients = await client.find({ userId: userId });
      return res.status(200).json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Произошла ошибка при получении пользователя" });
    }
  }

  static async putClientsByUserId(req, res) {
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
      const userId = userData._id;

      const clientId = req.body.clientId;

      const newStatus = req.body.status;

      const updatedClient = await client.findOneAndUpdate(
        { _id: clientId, userId: userId },
        { status: newStatus },
        { new: true }
      );

      if (!updatedClient) {
        return res.status(404).json({ message: "Клиент не найден" });
      }

      return res.status(200).json({ client: updatedClient });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Произошла ошибка при обновлении статуса клиента" });
    }
  }
}

module.exports = ClientController;
