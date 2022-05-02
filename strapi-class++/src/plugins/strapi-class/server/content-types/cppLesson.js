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
      maxLength: 500,
      required: true,
      configurable: false,
    },
    description: {
      type: "richtext",
      maxLength: 5000,
      required: true,
      configurable: false,
    },
    readingMaterial: {
      type: "media",
      configurable: false,
    },
    video: {
      type: "media",
      required: true,
      configurable: false,
    },
    course: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::strapi-class.cpp-course",
      inversedBy: "lesson",
      required: true,
      configurable: false,
    },
  },
};
