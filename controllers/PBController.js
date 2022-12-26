`use strict`;
const { Books, Publisher, PublishedBy } = require("../models");

class PBController {
  static async index(req, resp) {
    try {
      const publishedBy = await PublishedBy.findAll({
        include: [
          {
            model: Books,
            as: "book",
          },
          {
            model: Publisher,
            as: "publisher",
          },
        ],
      });
      resp.render(`publishedBy/index.ejs`, {publishedBy});
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async create(req, resp) {
    try {
      const { publisherId, booksId, releaseDate } = req.body;

      let publishedBy = await PublishedBy.create({
        publisherId: +publisherId,
        booksId: +booksId,
        releaseDate,
      });
      resp.json(publishedBy);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
  static async add(req, resp) {
    try {
      resp.render("publishedBy/add.ejs");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async update(req, resp) {
    try {
      const id = +req.params.id;

      const { publisherId, booksId, releaseDate } = req.body;

      let publishedBy = await PublishedBy.update(
        {
          publisherId: +publisherId,
          booksId: +booksId,
          releaseDate,
        },
        { where: { id } }
      );

      publishedBy[0] === 1 ? resp.redirect('/publishedBy') : resp.render(`errorPage/404.ejs`);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
  static async edit(req, resp) {
    try {
      const id = +req.params.id;

      let publishedBy = await PublishedBy.findByPk(id);
      let publisher = await Publisher.findAll();
      let book = await Books.findAll();

      resp.render("publishedBy/update.ejs/", {
        publishedBy,
        book,
        publisher,
      });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async delete(req, resp) {
    try {
      const id = +req.params.id;

      let publishedBy = await PublishedBy.destroy({
        where: { id },
      });

      publishedBy === 1 ? resp.redirect('/publishedBy') : resp.render(`errorPage/404.ejs`);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async search(req, resp) {
    try {
      const name = req.query.name;
      const searchResult = await PublishedBy.findAll({
        where: { name: releaseDate },
      });
      resp.json(searchResult);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
}

module.exports = PBController;
