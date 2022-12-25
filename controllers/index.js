`use strict`;

const MemberController = require("./MemberController.js");
const BookController = require("./BookController.js");
const PublisherController = require("./PublisherController.js");
const PBController = require("./PBController.js");

const {Books, Publisher, Members} = require('../models');

class index {
  static async showBooks(req, resp) {
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
}

module.exports = {
  MemberController,
  BookController,
  PublisherController,
  PBController,
};
