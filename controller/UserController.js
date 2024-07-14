const UserModel = require("../Model/UserModel");

module.exports.signup = async function (req, res) {
  let user = new UserModel(req.body);
  console.log(user);

  let data = await user.save();

  res.json({ data: data, msg: "signup done", rcode: 200 });
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email: email });

  if (user && user.password == password) {
    res.json({ data: user, msg: "login done", rcode: 200 });
  } else {
    res.json({ data: req.body, msg: "Invalid credential", rcode: -9 });
  }
};
