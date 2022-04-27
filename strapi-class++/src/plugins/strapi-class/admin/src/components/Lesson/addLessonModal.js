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
import { Box } from "@strapi/design-system/Box";
import Editor from "../Editor";

const AddLessonModal = ({
  isVisible,
  handleCloseAddLessonModal,
  handleClickAddLesson,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readingMaterial, setReadingMaterial] = useState("");
  const [lessonVideo, setLessonVideo] = useState("");
  const [error, setError] = useState({
    title: "",
    description: "",
  });

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

  const handleAddLesson = () => {
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
      // handleClickAddLesson()
      // setTitle("");
      // setSummary("");
      // setDescription("");
      // setFiles("");
    }
  };

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleCloseAddLessonModal} labelledBy="title">
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
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseAddLessonModal} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={() => handleAddLesson}>Save</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default AddLessonModal;
