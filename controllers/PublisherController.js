`use strict`;
const { Publisher, PublishedBy, Books } = require("../models");

class PublisherController {
  static async index(req, resp) {
    try {
      const publisher = await Publisher.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.render("publishers/index.ejs", { publisher });
      // resp.json(publisher)
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async create(req, resp) {
    try {
      const { name, address } = req.body;

      let publisher = await Publisher.create({
        name,
        address,
      });
      // resp.send(publisher);
      resp.redirect("/publishers");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
      // resp.render('', {message: error.message})
    }
  }

  static async add(req, resp) {
    try {
      resp.render("publishers/add.ejs");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async update(req, resp) {
    try {
      const id = +req.params.id;

      const { name, address } = req.body;

      let publisher = await Publisher.update(
        {
          name,
          address,
        },
        {
          where: { id },
        }
      );

      publisher[0] === 1
        ? resp.redirect("/publishers")
        : resp.render("errorPage/404.ejs", { message: `404 NOT FOUND!` });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async edit(req, resp) {
    try {
      const id = +req.params.id;
      let publisher = await Publisher.findByPk(id);
      let book = await Books.findAll();

      resp.render("publishers/update.ejs/", {
        book,
        publisher,
      });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async delete(req, resp) {
    const id = +req.params.id;

    let publisher = await Publisher.destroy({
      where: { id },
    });

    publisher === 1
      ? resp.redirect("/publishers")
      : resp.render("errorPage/404.ejs", { message: `404 NOT FOUND!` });
  }

  static async detail(req, resp) {
    try {
      const id = +req.params.id;
      let publisher = await PublishedBy.findAll({
        where: {
          publisherId: id,
        },
        include: [
          { model: Publisher, as: "publisher" },
          { model: Books, as: "book" },
        ],
      });
      resp.render(`publishers/detail.ejs`, { publisher: publisher });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
      console.log(error);
    }
  }

  static async search(req, resp) {
    try {
      const name = req.query.name;
      const searchResult = await Publisher.findAll({
        where: { name: name },
      });
      resp.json(searchResult);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
}

module.exports = PublisherController;
