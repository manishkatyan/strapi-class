import instance from "./axiosInstance";
const axios = instance;

export async function createCourse(
  title,
  summary,
  description,
  imageId,
  videoId
) {
  const response = await axios.post("/strapi-class/createCourse", {
    title,
    summary,
    description,
    imageId,
    videoId,
  });
  return response;
}

export async function getCourse(offset, limit, sort, order) {
  const response = await axios.get(
    `/strapi-class/getAllCourse/${offset}/${limit}/${sort}/${order}`
  );
  return response;
}

export async function getSingleCourse(id) {
  const response = await axios.get(`/strapi-class/getSingleCourse/${id}`);
  return response;
}

export async function updateCourse(
  id,
  title,
  summary,
  description,
  imageId,
  videoId
) {
  const response = await axios.put(`/strapi-class/updateCourse`, {
    id,
    title,
    summary,
    description,
    imageId,
    videoId,
  });
  return response;
}

export async function deleteCourse(id) {
  const response = await axios.delete(`/strapi-class/deleteCourse/${id}`);
  return response;
}

export async function uploadFiles(files) {
  const formDocument = new FormData();
  formDocument.append("files", files[0]);
  const response = await axios.post(`/upload`, formDocument);
  return response;
}

export async function getLesson(id, offset, limit, sort, order) {
  const response = await axios.get(
    `/strapi-class/getLessons/${id}/${offset}/${limit}/${sort}/${order}`
  );
  return response;
}

export async function addLesson(
  courseId,
  title,
  description,
  materialId,
  videoId
) {
  const response = await axios.post("/strapi-class/addLesson", {
    courseId,
    title,
    description,
    materialId,
    videoId,
  });
  return response;
}

export async function getSingleLesson(lessonId) {
  const response = await axios.get(`/strapi-class/getSingleLesson/${lessonId}`);
  return response;
}

export async function updateLesson(
  id,
  title,
  description,
  materialId,
  videoId
) {
  const response = await axios.put(`/strapi-class/updateLesson`, {
    id,
    title,
    description,
    materialId,
    videoId,
  });
  return response;
}

export async function deleteLesson(id) {
  const response = await axios.delete(`/strapi-class/deleteLesson/${id}`);
  return response;
}
