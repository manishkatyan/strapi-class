import React, { useState } from "react";
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
import { Textarea } from "@strapi/design-system/Textarea";
import { Box } from "@strapi/design-system/Box";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";
import Editor from "../Editor";
import { createCourse, uploadFiles } from "../../utils/apiCalls";

const CourseCreateModal = ({ isVisible, handleClose, handleClickSave }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [courseVideo, setCourseVideo] = useState([]);
  const [courseImage, setCourseImage] = useState([]);
  const [upload, setUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const [error, setError] = useState({
    title: "",
    description: "",
    summary: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setError({ ...error, title: "" });
    } else if (name === "summary") {
      setSummary(value);
      setError({ ...error, summary: "" });
    } else if (name === "courseImage") {
      setCourseImage(event.target.files);
    } else if (name === "courseVideo") {
      setCourseVideo(event.target.files);
    }
  };

  const handleChangeDescription = (target) => {
    setDescription(target.value);
    setError({ ...error, description: "" });
  };

  const handleSaveCourse = async () => {
    if (!title && !summary && !description) {
      setError({
        ...error,
        title: "Title is required",
        summary: "Summary is required",
        description: "Description is required",
      });
    } else if (!title) {
      setError({
        ...error,
        title: "Title is required",
        summary: "",
        description: "",
      });
    } else if (!summary) {
      setError({
        ...error,
        title: "",
        summary: "Summary is required",
        description: "",
      });
    } else if (!description) {
      setError({
        ...error,
        title: "",
        summary: "",
        description: "Description is required",
      });
    } else {
      let imageId, videoId;
      if (courseImage.length > 0) {
        setUpload(true);
        setUploadMessage("Uploading Course Image");
        const response = await uploadFiles(courseImage);
        imageId = response.data[0].id;
      }
      if (courseVideo.length > 0) {
        setUpload(true);
        setUploadMessage("Uploading Course Video");
        const response = await uploadFiles(courseVideo);
        videoId = response.data[0].id;
      }

      const response = await createCourse(
        title,
        summary,
        description,
        imageId,
        videoId
      );
      if (response?.data?.id) {
        setUpload(false);
        setUploadMessage("");
        setTitle("");
        setSummary("");
        setDescription("");
        setCourseVideo("");
        setCourseImage("");

        // call to close modal
        handleClickSave();
      }
    }
  };

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleClose} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Create Course
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Grid gap={5}>
              <GridItem col={12}>
                <TextInput
                  placeholder="Title of the Course"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  error={error.title ? error.title : ""}
                  required
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  placeholder="summary of the course"
                  label="Course Summary"
                  name="summary"
                  onChange={handleChange}
                  error={error.summary ? error.summary : ""}
                  required
                >
                  {summary}
                </Textarea>
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
                  Course Image&nbsp;(optional)
                </Typography>

                <Box paddingTop={3}>
                  <input
                    type="file"
                    name="courseImage"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Box>
              </GridItem>
              <GridItem col={6}>
                <Typography variant="pi" fontWeight="bold">
                  Course Video&nbsp;(optional)
                </Typography>

                <Box paddingTop={3}>
                  <input
                    type="file"
                    name="courseVideo"
                    onChange={handleChange}
                    accept="video/*"
                  />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={handleClose}
                variant="tertiary"
                disabled={upload}
              >
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
                <Button onClick={handleSaveCourse}>Save</Button>
              )
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CourseCreateModal;
