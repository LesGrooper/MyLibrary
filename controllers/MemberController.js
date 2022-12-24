`use strict`;
const { Member, Books } = require("../models");

class MemberController {
  static async index(req, resp) {
    try {
      const member = await Member.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.json(member)
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
    }
  }
  static async create(req,resp) {
    try {
        const {name, address, booksId} = req.body;

    let member = await Member.create({
        name, address, booksId
    })

    resp.json(member)
    } catch (error) {
        resp.json(error)
        // resp.render('', {message: error.message})
    }
  }
}

module.exports = MemberController;
