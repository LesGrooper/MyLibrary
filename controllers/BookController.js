`use strict`;
const { Books, PublishedBy, Publisher } = require("../models");

class BookController {
  static async index(req, resp) {
    try {
      const book = await Books.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.render("books/index.ejs", { book });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async create(req, resp) {
    try {
      const { author, title, price, availability } = req.body;

      let book = await Books.create({
        author,
        title,
        price,
        availability,
      });
      resp.redirect("/books");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async add(req, resp) {
    try {
      resp.render("books/add.ejs");
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async update(req, resp) {
    try {
      const id = +req.params.id;
      const { author, title, price, availability } = req.body;

      let book = await Books.update(
        {
          author,
          title,
          price,
          availability,
        },
        {
          where: { id },
        }
      );

      book[0] === 1 ? resp.redirect("/books") : resp.render('errorPage/404.ejs', {message: `404 NOT FOUND!`})
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
  static async edit(req, resp) {
    try {
      const id = +req.params.id;

      let book = await Books.findByPk(id);
      let publisher = await Publisher.findAll();

      resp.render("books/update.ejs/", {
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

      let book = await Books.destroy({
        where: { id },
      });

      book === 1 ? resp.redirect("/books") : resp.render('errorPage/404.ejs', {message: `404 NOT FOUND!`})
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async detail(req, resp) {
    try {
      const id = +req.params.id;

      let books = await PublishedBy.findAll({
        where: {
          booksId: id,
        },
        include: [
          { model: Publisher, as: "publisher" },
          { model: Books, as: "book" },
        ],
        order: [[`id`, `ASC`]],
      });

      resp.render(`books/detail.ejs`, { books: books });
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }

  static async search(req, resp) {
    try {
      const author = req.query.author;
      const searchResult = await Books.findAll({
        where: { author: author },
      });
      resp.json(searchResult);
    } catch (error) {
      resp.render("errorPage/error.ejs", { message: error.message });
    }
  }
}

module.exports = BookController;
