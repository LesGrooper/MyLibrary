`use strict`;
const { Books, Publisher, PublishedBy } = require("../models");

class PublisherController {
  static async index(req, resp) {
    try {
      const publishedBy = await PublishedBy.findAll();
      resp.json(publishedBy)
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
    }
  }
}

module.exports = PublisherController;
