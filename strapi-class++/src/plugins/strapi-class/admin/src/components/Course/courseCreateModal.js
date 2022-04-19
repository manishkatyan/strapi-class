import React from "react";
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

const CourseCreateModal = ({ isVisible, handleClose, handleClickSave }) => {
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
              <GridItem col={6}>
                <TextInput
                  placeholder="Title of the Course"
                  label="Title"
                  name="title"
                  // onChange={handleChange}
                  // error={error.title ? error.title : ""}
                  required
                />
              </GridItem>
              <GridItem col={6}>
                <Textarea
                  placeholder="Description of the course"
                  label="Description"
                  name="description"
                  // onChange={handleChange}
                  // error={error.description ? error.description : ""}
                  required
                >
                  {/* {description} */}
                </Textarea>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={<Button onClick={handleClickSave}>Save</Button>}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CourseCreateModal;
