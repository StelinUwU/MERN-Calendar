const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const signJwt = require("../helpers/jwt");
const registerUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "Email already registered" });
    }
    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    //Generar JWT
    const token = await signJwt(user.id, user.name);

    res.status(201).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Por favor hable con el admin" });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, msg: "Invalid user or password" });
    }
    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "Invalid user or password" });
    }

    const token = await signJwt(user.id, user.name);

    res.status(201).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor hable con el admin" });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  //Generar un nuevo JWT
  const token = await signJwt(uid, name);
  res.json({ ok: true, msg: "renew", token, uid, name });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};
