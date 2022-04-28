import React, { useState, useEffect } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Box } from "@strapi/design-system/Box";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";
import Editor from "../Editor";
import { getLessonEdit, uploadFiles, updateLesson } from "../../utils/apiCalls";

const EditLessonModal = ({
  lessonId,
  isEditVisible,
  handleCloseEditLessonModal,
  handleClickUpdateLesson,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readingMaterial, setReadingMaterial] = useState([]);
  const [lessonVideo, setLessonVideo] = useState([]);
  const [upload, setUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [error, setError] = useState({
    title: "",
    description: "",
  });

  useEffect(async () => {
    if (lessonId) {
      const response = await getLessonEdit(lessonId);
      if (response.data?.id) {
        setTitle(response.data?.title);
        setDescription(response.data?.description);
      }
    }
  }, [isEditVisible]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setError({ ...error, title: "" });
    } else if (name === "readingMaterial") {
      setReadingMaterial(event.target.files);
    } else if (name === "lessonVideo") {
      setLessonVideo(event.target.files);
    }
  };

  const handleChangeDescription = (target) => {
    setDescription(target.value);
    setError({ ...error, description: "" });
  };

  const handleUpdateLesson = async () => {
    if (!title && !description) {
      setError({
        ...error,
        title: "Title is required",
        description: "Description is required",
      });
    } else if (!title) {
      setError({
        ...error,
        title: "Title is required",
        description: "",
      });
    } else if (!description) {
      setError({
        ...error,
        title: "",
        description: "Description is required",
      });
    } else {
      let materialId, videoId;
      if (readingMaterial.length > 0) {
        setUpload(true);
        setUploadMessage("Uploading reading material");
        const response = await uploadFiles(readingMaterial);
        materialId = response.data[0].id;
      }
      if (lessonVideo.length > 0) {
        setUpload(true);
        setUploadMessage("Uploading lesson video ");
        const response = await uploadFiles(lessonVideo);
        videoId = response.data[0].id;
      }

      const response = await updateLesson(
        lessonId,
        title,
        description,
        materialId,
        videoId
      );
      if (response.data?.id) {
        setUpload(false);
        setUploadMessage("");

        // call to close modal
        handleClickUpdateLesson();
      }
    }
  };

  return (
    <>
      {isEditVisible && (
        <ModalLayout onClose={handleCloseEditLessonModal} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Add Lesson
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Grid gap={5}>
              <GridItem col={12}>
                <TextInput
                  placeholder="Title of the Lesson"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  error={error.title ? error.title : ""}
                  required
                />
              </GridItem>
              <GridItem col={12}>
                <Typography variant="pi" fontWeight="bold">
                  Description
                </Typography>
                <Editor
                  handleChange={(target) => handleChangeDescription(target)}
                  name="description"
                  value={description}
                />
                {error.description ? (
                  <Typography variant="pi" textColor="danger700">
                    {error.description}
                  </Typography>
                ) : (
                  ""
                )}
              </GridItem>
              <GridItem col={6}>
                <Typography variant="pi" fontWeight="bold">
                  Reading Materials
                </Typography>
                <Box paddingTop={3}>
                  <input
                    type="file"
                    name="readingMaterial"
                    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6}>
                <Typography variant="pi" fontWeight="bold">
                  Video
                </Typography>
                <Box paddingTop={3}>
                  <input
                    type="file"
                    name="lessonVideo"
                    accept="video/*"
                    onChange={handleChange}
                  />
                </Box>
                {error.lessonVideo ? (
                  <Typography variant="pi" textColor="danger700">
                    {error.lessonVideo}
                  </Typography>
                ) : (
                  ""
                )}
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEditLessonModal} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              upload ? (
                <Flex justifyContent="center">
                  <Loader small>Loading......</Loader>
                  <Typography fontWeight="bold" textColor="primary600" as="h2">
                    {uploadMessage ? uploadMessage : ""}
                  </Typography>
                </Flex>
              ) : (
                <Button onClick={handleUpdateLesson}>update</Button>
              )
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EditLessonModal;
