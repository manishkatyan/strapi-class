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
import { Textarea } from "@strapi/design-system/Textarea";
import { Box } from "@strapi/design-system/Box";
import { getSingleCourse } from "../../utils/apiCalls";
import Editor from "../Editor";

const CourseEditModal = ({
  courseId,
  isVisible,
  handleClose,
  handleClickUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [courseVideo, setCourseVideo] = useState([]);
  const [courseImage, setCourseImage] = useState([]);
  const [upload, setUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [error, setError] = useState({
    title: "",
    summary: "",
    description: "",
  });

  useEffect(async () => {
    if (courseId) {
      const response = await getSingleCourse(courseId);
      if (response.data?.id) {
        setTitle(response.data?.title);
        setSummary(response.data?.summary);
        setDescription(response.data?.description);
      }
    }
  }, [isVisible]);
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

  const handleUpdateCourse = () => {
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
      handleClickUpdate(courseId, title, summary, description, files);
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
                  value={title}
                  onChange={handleChange}
                  error={error.title ? error.title : ""}
                  required
                />
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  placeholder="Summary of the course"
                  label="Summary"
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
                  />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={<Button onClick={handleUpdateCourse}>Update</Button>}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CourseEditModal;
