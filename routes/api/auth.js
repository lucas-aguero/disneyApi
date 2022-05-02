const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const helpers = require('../../helpers/helpers');
const middlewares = require('../../middlewares/middlewares');

const { User } = require("../../config/database");

router.get("/", middlewares.checkToken, async (req, res) => {
  const usersList = await User.findAll();
  res.json(usersList);
});

router.put("/:id", middlewares.checkToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (user) {
    await User.update(req.body, {where: { id: req.params.id },});
    res.json({ success: "User Updated" });
  } else {
    res.json({ error: "User not Found" });
  }  
});

router.delete("/:id", middlewares.checkToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (user) {
    await User.destroy({where: { id: req.params.id },});
    res.json({ success: "User Deleted" });
  } else {
    res.json({ error: "User not Found" });
  }  
});

router.post("/register",[
    check("email", "Email is not valid.").isEmail(),
    check("name_first", "First Name is Empty.").not().isEmpty(),
    check("name_last", "Last Name is Empty.").not().isEmpty(),
    check("password", "Password is Empty.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
    req.body.password = await helpers.encryptPassword(req.body.password);
    const user = await User.create(req.body);
    res.json(user);

    } else {
      res.json({ error: "User exists" });
    }
  }
);

router.post("/login",[
    check("email", "Email is not valid.").isEmail(),
    check("password", "Password is Empty.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      const validPassword = await helpers.matchPassword(req.body.password,user.password);
      if (validPassword) {
        res.json({ success: helpers.createToken(user) });
      } else {
        res.json({ error: "User/Password Not Valid" });
      }
    } else {
      res.json({ error: "User/Password Not Valid" });
    }
  }
);

module.exports = router;
