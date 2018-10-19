const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connUri = process.env.MONGO_LOCAL_CONN_URL;
console.log(connUri);

module.exports = {
  add: async (req, res) => {
    try {
      await mongoose.connect(
        connUri,
        { useNewUrlParser: true }
      );
      const { name, password } = req.body;
      const user = user.save(new User({ name, password }));
      res.status(201).send({ result: user });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  },
  login: async (req, res) => {
    try {
      await mongoose.connect(
        connUri,
        { useNewUrlParser: true }
      );
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      const match = await bcrypt.compare(password, user.password);
      if (!user || !match) {
        res.status(401).send({ error: "Authentication error" });
      } else {
        const payload = { user: user.name };
        const options = { expiresIn: "2d", issuer: "mydemo.se" };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        res.status(200).send({ result: user, token });
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  },
  getAll: async (req, res) => {
    try {
      await mongoose.connect(
        connUri,
        { useNewUrlParser: true }
      );
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};
