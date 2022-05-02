const jwt = require("jwt-simple");
const moment = require('moment');

const checkToken = (req, res, next) => {
  if (!req.headers["user-token"]) {
    return res.json({ error: "user-token not found in headers" });
  }

  const userToken = req.headers["user-token"];
  let payload = {};

  try {
    payload = jwt.decode(userToken, 'secret phrase');
  } catch (err) {
    return res.json({ error: "Invalid token" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({ error: "Token is Expired" });
  }

  req.userId = payload.userId;

  next();
};

module.exports = {
  checkToken,
};
