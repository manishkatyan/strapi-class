"use strict";

const cppCourseSchema = require("./cppCourse");
const cppLessonSchema = require("./cppLesson");

module.exports = {
  "cpp-course": { schema: cppCourseSchema }, // should re-use the singularName of the content-type
  "cpp-lesson": { schema: cppLessonSchema },
};
