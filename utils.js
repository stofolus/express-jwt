const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizedHeader = req.headers.authorization;
    if (!authorizedHeader) {
      res.status(401).end();
    }
    const token = authorizedHeader.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: "2d",
      issuer: "mydemo.se"
    };
    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options);
      req.decoded = result;
      next();
    } catch (err) {
      res.status(500).end();
    }
  }
};
