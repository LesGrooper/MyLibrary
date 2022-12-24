`use strict`;
const { Books, Member } = require("../models");

class BookController {
  static async index(req, resp) {
    try {
      const book = await Books.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.json(book);
    } catch (error) {
      resp.json(error);
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
      resp.json(book)
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
    }
  }
}

module.exports = BookController;