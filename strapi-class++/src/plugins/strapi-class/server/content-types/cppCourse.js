module.exports = {
  info: {
    tableName: "CppCourse",
    singularName: "cpp-course", // kebab-case mandatory
    pluralName: "cpp-course", // kebab-case mandatory
    displayName: "CPPCourse",
    description: "CPP Course",
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
    summary: {
      type: "text",
      maxLength: 1000,
      required: true,
      configurable: false,
    },
    description: {
      type: "richtext",
      maxLength: 10000,
      required: true,
      configurable: false,
    },
    image: {
      type: "media",
      required: true,
      configurable: false,
    },
    video: {
      type: "media",
      configurable: false,
    },
    lesson: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::strapi-class.cpp-lesson",
      mappedBy: "course",
      configurable: false,
    },
  },
};
