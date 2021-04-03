

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async index(ctx) {
    // This a mongoose database query
    const result = await strapi.query('capstones').model.find().exec();
    ctx.send(result.map(entry => entry.toObject()));
  },
};