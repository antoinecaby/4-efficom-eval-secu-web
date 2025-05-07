const User = require("./../model/user.schema.js");
const Role = require("../model/role.schema.js");
const bcrypt = require("bcrypt");

const getAll = (req, res, next) => {
  let result = User.findAll();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  let result = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!result) {
    return res.status(404).json({ error: "utilisateur non trouvé" });
  }
  return res.status(200).json(result);
};

const create = async (req, res, next) => {
  let member = await Role.findOne({ where: { name: "Member" } });
  if (!member) {
    return res
      .status(404)
      .json({ message: "Le rôle Member n'as pas été trouvé" });
  }
  try {
    let result = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 4),
      roles: [member.id],
    });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const update = (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Error: cannot generate hash for password" });
  }
  try {
    const result = User.updateOne(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(404).json(e.message);
  }
};

const remove = (req, res, next) => {
  let result = User.remove(req.params.id);
  res.status(200).json(result);
};

const addRole = async (req, res, next) => {
  try {
    let role = await Role.findOne({ where: { id: req.params.roleId } });
    let user = await User.findOne({ where: { id: req.params.userId } });
    user.addRole(role);
    user.save();
    return res
      .status(201)
      .json({ message: "Le rôle a bien été ajouté à l'utilisateur" });
  } catch (e) {
    return res.status(404).json(e);
  }
};

const removeRole = async (req, res, next) => {
  try {
    let role = await Role.findOne({ where: { id: req.params.roleId } });
    let user = await User.findOne({ where: { id: req.params.userId } });
    user.removeRole(role);
    user.save();
    return res
      .status(201)
      .json({ message: "Le rôle a bien été retiré de l'utilisateur" });
  } catch (e) {
    return res.status(404).json(e);
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  addRole,
  removeRole,
};
