module.exports = ({ strapi }) => ({
  addLesson: async (ctx) => {
    const { courseId, title, description, materialId, videoId } =
      ctx.request.body;

    const createLessonResponse = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .create({
        data: {
          course: courseId,
          title,
          description,
          readingMaterial: materialId,
          video: videoId,
        },
      });
    ctx.send(createLessonResponse, 200);
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
  getSingleLesson: async (ctx) => {
    const { lessonId } = ctx.params;
    const response = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .findOne({
        where: { id: lessonId },
        populate: true,
      });
    ctx.body = response;
  },
  updateLesson: async (ctx) => {
    const { id, title, description, materialId, videoId } = ctx.request.body;
    let updateData;
    if (materialId && videoId) {
      updateData = {
        title,
        description,
        readingMaterial: materialId,
        video: videoId,
      };
    } else if (materialId) {
      updateData = {
        title,
        description,
        readingMaterial: materialId,
      };
    } else if (videoId) {
      updateData = {
        title,
        description,
        video: videoId,
      };
    } else {
      updateData = {
        title,
        description,
      };
    }
    const response = await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .update({
        where: { id: id },
        data: updateData,
      });
    ctx.body = response;
  },
  deleteLesson: async (ctx) => {
    const { id } = ctx.params;
    await strapi
      .query("plugin::strapi-class.cpp-lesson")
      .delete({ where: { id: id } });
  },
});
