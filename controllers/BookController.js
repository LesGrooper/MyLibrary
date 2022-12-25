`use strict`;
const { Books, PublishedBy, Publisher } = require("../models");

class BookController {
  static async index(req, resp) {
    try {
      const book = await Books.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.json(book);
    } catch (error) {
      resp.json(error);
      console.log(error);
      // resp.render('', {message: error.message})
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
      resp.json(book);
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
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

      book[0] === 1 ? resp.json("masuk") : resp.json(`belum masuk`);
    } catch (error) {
      resp.json(error);
    }
  }

  static async delete(req, resp) {
    try {
      const id = +req.params.id;

      let book = await Books.destroy({
        where: { id },
      });

      book === 1 ? resp.json("masuk") : resp.json(`belum masuk`);
    } catch (error) {
      resp.json(error);
    }
  }

  static async detail(req, resp) {
    try {


      let book = await PublishedBy.findAll({
        where: {
          booksId: req.params.id,
        },
        include: [
          { model: Books, as: "book" },
          { model: Publisher, as: "publisher" },
        ],
      });

      resp.json(book);
    } catch (error) {
      // console.log(error)
      resp.json(error);
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
      resp.json(error);
      console.log(error);
    }
  }
}

module.exports = BookController;
