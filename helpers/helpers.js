const helpers = {};
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const moment = require('moment');

helpers.createToken = (user) => {
    const payload = {
      userId: user.id,
      createdAt: moment().unix(),
      expiredAt: moment().add(30, "minutes").unix(),
    };
  
    return jwt.encode(payload, "secret phrase");
  };


helpers.encryptPassword = async(password) => {
    const pattern = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,pattern);
    console.log("*****************");
    console.log(hash);
    return hash;
};

helpers.matchPassword = async(password,savedPassword) => {
    return await bcrypt.compare(password,savedPassword);
};


module.exports = helpers;
