module.exports = ({ strapi }) => ({
  addLesson: async (ctx) => {
    const { title, summary, description, imageId, videoId } = ctx.request.body;

    const createCourseResponse = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .create({
        data: { title, summary, description, image: imageId, video: videoId },
      });
    ctx.send(createCourseResponse, 200);
  },
  getLessons: async (ctx) => {
    const { id, offset, limit, sort, order } = ctx.params;
    let needToshort;
    if (sort === "title") {
      needToshort = { title: `${order}` };
    } else if (sort === "date") {
      needToshort = { createdAt: `${order}` };
    }

    const count = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .count({ where: { course: id } });

    const res = await strapi.query("plugin::strapi-class.cpp-lesson").findMany({
      where: { course: id },
      orderBy: needToshort,
      offset,
      limit,
      populate: true,
    });

    ctx.body = { res, count };
  },
});
