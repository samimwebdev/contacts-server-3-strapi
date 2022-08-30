"use strict";

/**
 *  contact controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::contact.contact", ({ strapi }) => ({
  async delete(ctx) {
    const { id } = ctx.params;
    const { id: authId } = ctx.state.user;

    try {
      //using entityService
      // const contact = await strapi.entityService.findOne(
      //   "api::contact.contact",
      //   +id,
      //   {
      //     populate: "author",
      //   }
      // );

      // if (!contact) return ctx.notFound("contact is not found to be updated");
      // if (contact.author.id !== authId)
      //   return ctx.unauthorized(
      //     "you are not the owner of the contact to update the contact"
      //   );

      // const response = await super.delete(ctx);
      // return response;

      //using super method
      ctx.query.populate = "author";
      const contactResp = await super.findOne(ctx);

      if (!contactResp)
        return ctx.notFound("contact is not found to be deleted");
      if (contactResp.data.attributes?.author?.data?.id !== authId)
        return ctx.unauthorized("you are not the owner of the contact");

      const response = await super.delete(ctx);
      return response;
    } catch (err) {
      ctx.internalServerError("Unknown Error");
    }
  },

  async create(ctx) {
    try {
      const { id } = ctx.state.user;
      ctx.request.body.data.author = id;
      const response = await super.create(ctx);
      return response;
    } catch (err) {
      ctx.internalServerError("Unknown Error");
    }
  },

  async update(ctx) {
    const { id: authId } = ctx.state.user;
    const { id } = ctx.params;
    try {
      const contact = await strapi.entityService.findOne(
        "api::contact.contact",
        +id,
        {
          populate: "author",
        }
      );

      if (!contact) return ctx.notFound("contact is not found to be updated");
      if (contact.author.id !== authId)
        return ctx.unauthorized(
          "you are not the owner of the contact to update the contact"
        );

      const response = await super.update(ctx);
      return response;
    } catch (err) {
      ctx.internalServerError("Unknown Error");
    }
  },
}));
