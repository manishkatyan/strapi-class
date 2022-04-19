module.exports = {
  info: {
    tableName: "CppLesson",
    singularName: "cpp-lesson", // kebab-case mandatory
    pluralName: "cpp-lessons", // kebab-case mandatory
    displayName: "CPPLesson",
    description: "CPP Lesson",
    kind: "collectionType",
  },
  options: {
    draftAndPublish: "false",
  },
  pluginOptions: {
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
  },
  attributes: {
    title: {
      type: "string",
      maxLength: 250,
      required: true,
      configurable: false,
    },

    lessonText: {
      type: "string",
      maxLength: 8000,
      configurable: false,
    },
    lessonVideo: {
      type: "media",
      maxLength: 256000,
      configurable: false,
    },
    readingMaterial: {
      type: "media",
      maxLength: 2048,
      configurable: false,
    },

    course: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::strapi-class.cpp-course",
      inversedBy: "lesson",
      configurable: false,
    },
  },
};
