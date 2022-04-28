module.exports = [
  {
    method: "POST",
    path: "/createCourse",
    handler: "courseController.createCourse",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getAllCourse/:offset/:limit/:sort/:order",
    handler: "courseController.getAllCourse",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getCourse",
    handler: "courseController.getCourse",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getSingleCourse/:id",
    handler: "courseController.getSingleCourse",
    config: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/updateCourse",
    handler: "courseController.updateCourse",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getLessons/:id/:offset/:limit/:sort/:order",
    handler: "lessonController.getLessons",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/addLesson",
    handler: "lessonController.addLesson",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getSingleLesson/:lessonId",
    handler: "lessonController.getSingleLesson",
    config: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/updateLesson",
    handler: "lessonController.updateLesson",
    config: {
      auth: false,
    },
  },
];
