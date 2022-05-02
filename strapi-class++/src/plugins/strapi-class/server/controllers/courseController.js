"use strict";

module.exports = ({ strapi }) => ({
  createCourse: async (ctx) => {
    const { title, summary, description, imageId, videoId } = ctx.request.body;

    const createCourseResponse = await strapi
      .query("plugin::strapi-class.cpp-course")
      .create({
        data: { title, summary, description, image: imageId, video: videoId },
      });
    ctx.send(createCourseResponse, 200);
  },
  getAllCourse: async (ctx) => {
    const { offset, limit, sort, order } = ctx.params;
    let needToshort;
    if (sort === "title") {
      needToshort = { title: `${order}` };
    } else if (sort === "date") {
      needToshort = { createdAt: `${order}` };
    }
    const count = await strapi.query("plugin::strapi-class.cpp-course").count();

    const res = await strapi.query("plugin::strapi-class.cpp-course").findMany({
      orderBy: needToshort,
      offset,
      limit,
      populate: true,
    });

    ctx.body = { res, count };
  },
  getCourse: async (ctx) => {
    const response = await strapi
      .query("plugin::strapi-class.cpp-course")
      .findMany({
        populate: true,
      });

    ctx.body = response;
  },
  getSingleCourse: async (ctx) => {
    const { id } = ctx.params;
    const response = await strapi
      .query("plugin::strapi-class.cpp-course")
      .findOne({
        where: { id: id },
        populate: true,
      });
    ctx.body = response;
  },
  updateCourse: async (ctx) => {
    const { id, title, summary, description, imageId, videoId } =
      ctx.request.body;
    let updateData;
    if (imageId && videoId) {
      updateData = {
        title,
        summary,
        description,
        image: imageId,
        video: videoId,
      };
    } else if (imageId) {
      updateData = {
        title,
        summary,
        description,
        image: imageId,
      };
    } else if (videoId) {
      updateData = {
        title,
        summary,
        description,
        video: videoId,
      };
    } else {
      updateData = {
        title,
        summary,
        description,
      };
    }
    const response = await strapi
      .query("plugin::strapi-class.cpp-course")
      .update({
        where: { id: id },
        data: updateData,
      });
    ctx.body = response;
  },
  deleteCourse: async (ctx) => {
    const { id } = ctx.params;
    const lessons = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .findMany({ where: { course: id } });
    lessons.forEach(async (lesson) => {
      await strapi
        .query("plugin::strapi-class.cpp-lesson")
        .delete({ where: { id: lesson.id } });
    });

    await strapi
      .query("plugin::strapi-class.cpp-course")
      .delete({ where: { id } });
  },
});
