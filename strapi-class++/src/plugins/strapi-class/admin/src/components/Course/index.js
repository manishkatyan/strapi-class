import React, { useState } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import CourseCreateModal from "./courseCreateModal";

const Course = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // course create modal Close
  const handleCloseCreateModal = () => setIsCreateModalVisible((prev) => !prev);

  // Course Create api Call
  const handleCreateCourse = () => {
    setIsCreateModalVisible((prev) => !prev);
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
          handleClickSave={handleCreateCourse}
        />
      </Flex>
    </>
  );
};

export default Course;
