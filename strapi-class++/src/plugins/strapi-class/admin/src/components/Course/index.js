import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { LinkButton } from "@strapi/design-system/LinkButton";
import Plus from "@strapi/icons/Plus";
import CourseCreateModal from "./courseCreateModal";
import CourseTable from "./courseTable";
import { createCourse, updateCourse, uploadFiles } from "../../utils/apiCalls";
import CourseEditModal from "./courseEditModal";

const Course = () => {
  const { url } = useRouteMatch();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditCourseModal, setIsEditCourseModal] = useState(false);
  const [courseId, setCourseId] = useState("");

  // course create modal Close
  const handleCloseCreateModal = () => setIsCreateModalVisible((prev) => !prev);

  // Course Create api Call
  const handleCreateCourse = () => {
    setIsCreateModalVisible((prev) => !prev);
  };

  const handleCourseEditModal = (id) => {
    setCourseId(id);
    setIsEditCourseModal((prev) => !prev);
  };

  const handleCloseEditModal = () => setIsEditCourseModal((prev) => !prev);

  const handleUpdateCourse = () => {
    setIsEditCourseModal((prev) => !prev);
  };

  return (
    <>
      <Box paddingTop={6} paddingLeft={8}>
        <Typography variant="alpha">Lorem ipsum dolor</Typography>
        <Box>
          <Typography variant="omega">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <Flex justifyContent="end" paddingRight={10} paddingTop={4}>
        <Button onClick={() => setIsCreateModalVisible((prev) => !prev)}>
          Add Course
        </Button>
        <CourseCreateModal
          isVisible={isCreateModalVisible}
          handleClose={handleCloseCreateModal}
          handleClickSave={(
            title,
            summary,
            description,
            courseImage,
            courseVideo
          ) =>
            handleCreateCourse(
              title,
              summary,
              description,
              courseImage,
              courseVideo
            )
          }
        />
      </Flex>
      <CourseTable
        isVisible={isCreateModalVisible}
        isEditVisible={isEditCourseModal}
        handleCourseEdit={(id) => handleCourseEditModal(id)}
      />
      <CourseEditModal
        courseId={courseId}
        isVisible={isEditCourseModal}
        handleClose={handleCloseEditModal}
        handleClickUpdate={handleUpdateCourse}
      />
    </>
  );
};

export default Course;
