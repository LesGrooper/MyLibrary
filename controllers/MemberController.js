`use strict`;
const { Member, Books } = require("../models");

class MemberController {
  static async index(req, resp) {
    try {
      const member = await Member.findAll({
        order: [[`id`, `ASC`]],
        include: [{ model: Books, as: "book" }],
      });
      resp.render("members/index.ejs", { member });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
  static async create(req, resp) {
    try {
      const { name, address, booksId } = req.body;

      let member = await Member.create({
        name,
        address,
        booksId,
      });

      resp.redirect("/members");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async add(req, resp) {
    try {
      resp.render("members/add.ejs");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async update(req, resp) {
    try {
      const id = +req.params.id;

      const { name, address, booksId } = req.body;

      let member = await Member.update(
        {
          name,
          address,
          booksId,
        },
        {
          where: { id },
        }
      );

      member[0] === 1
        ? resp.redirect("/members")
        : resp.render("errorPage/404.ejs", { message: `404 NOT FOUND!` });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async edit(req, resp) {
    try {
      const id = +req.params.id;

      let member = await Member.findByPk(id);

      resp.render("members/update.ejs", { member });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async delete(req, resp) {
    try {
      const id = req.params.id;

      let member = await Member.destroy({
        where: { id },
      });

      member === 1
        ? resp.redirect("/members")
        : resp.render("errorPage/404.ejs", { message: `404 NOT FOUND!` });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async detail(req, resp) {
    try {
      const id = +req.params.id;

      let member = await Member.findAll({
        where: {
          booksId: id,
        },
        include: [{ model: Books, as: "book" }],
      });
      resp.render(`members/detail.ejs`, { member: member });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async search(req, resp) {
    try {
      const name = req.query.name;
      const searchResult = await Member.findAll({
        where: { name: name },
      });
      resp.json(searchResult);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
}

module.exports = MemberController;
