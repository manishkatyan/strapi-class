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

const EditLessonModal = ({
  isEditVisible,
  handleCloseEditLessonModal,
  handleClickEditLesson,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [error, setError] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setError({ ...error, title: "" });
    } else if (name === "files") {
      setFiles(event.target.files);
    }
  };

  const handleChangeDescription = (target) => {
    setDescription(target.value);
    setError({ ...error, description: "" });
  };

  const handleEditLesson = () => {
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
      // setTitle("");
      // setSummary("");
      // setDescription("");
      // setFiles("");
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
                    name="readingMaterials"
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6}>
                <Typography variant="pi" fontWeight="bold">
                  Video
                </Typography>
                <Box paddingTop={3}>
                  <input type="file" name="files" onChange={handleChange} />
                </Box>
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
              <>
                <Button onClick={() => handleEditLesson}>aupdate</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EditLessonModal;
