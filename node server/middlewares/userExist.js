const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const sendingData = {
    role: 5,
    email_confirmed: -1,
    phone_confirmed: -1,
    loged: -1,
  };

  let token = req.cookies.auth_token ? req.cookies.auth_token : undefined;
  if (token == undefined) {
    token = req.headers.auth_token ? req.headers.auth_token : undefined;
  }
  if (token == undefined) {
    res.status(422).json({ msg: "please login ...", data: sendingData });
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      console.log(err);
      res
        .status(422)
        .json({ msg: "please login ...", clearToken: 1, data: sendingData });
    }
  }
};
