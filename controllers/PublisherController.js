`use strict`;
const { Publisher } = require("../models");

class PublisherController {
  static async index(req, resp) {
    try {
      const publisher = await Publisher.findAll({
        order: [[`id`, `ASC`]],
      });
      resp.json(publisher);
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
    }
  }

  static async create(req, resp) {
    try {
      const { name, address } = req.body;

      let publisher = await Publisher.create({
        name,
        address,
      });

      resp.json(publisher);
    } catch (error) {
      resp.json(error);
      // resp.render('', {message: error.message})
    }
  }

  static async search(req, resp) {
    try {
      const name = req.query.name;
      const searchResult = await Publisher.findAll({
        where: {name: name},
      });
      resp.json(searchResult);
    } catch (error) {
      resp.json(error);
    }
  }
}

module.exports = PublisherController;
