const mongoose = require("mongoose");
const User = require("../models/users");

const connUri = process.env.MONGO_LOCAL_CONN_URL;
console.log(connUri);

module.exports = {
  add: (req, res) => {
    mongoose
      .connect(
        connUri,
        { useNewUrlParser: true }
      )
      .then(() => {
        const { name, password } = req.body;
        const user = new User({ name, password });
        return user.save();
      })
      .then(user => {
        res.status(201).send({ result: user });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
  }
};
