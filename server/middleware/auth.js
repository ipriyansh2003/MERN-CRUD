const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
      console.log(req)
      const token = req.cookies.jwt;
      console.log(token)
      if (!token) return res.status(401).json({ errorMessage: "Unauthorized 1" });
  
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified.user;
  
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ errorMessage: "Unauthorized 2" });
    }
  }
  
  module.exports = auth;