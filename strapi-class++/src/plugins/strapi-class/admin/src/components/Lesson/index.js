import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box } from "@strapi/design-system/Box";
import { Link } from "@strapi/design-system/Link";
import { Stack } from "@strapi/design-system/Stack";
import { Breadcrumbs, Crumb } from "@strapi/design-system/Breadcrumbs";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import ArrowLeft from "@strapi/icons/ArrowLeft";
import AddLessonModal from "./addLessonModal";
import LessonTable from "./lessonTable";
import EditLessonModal from "./EditLessonModal";

const Lessons = () => {
  const { courseId, courseName } = useParams();

  const [isEditLessonModal, setIsEditLessonModal] = useState(false);
  const [lessonId, setLessonId] = useState("");

  const handleCloseEditModal = () => setIsEditLessonModal((prev) => !prev);

  const handleLessonEditModal = (id) => {
    setLessonId(id);
    setIsEditLessonModal((prev) => !prev);
  };
  const handleUpdateLesson = () => setIsEditLessonModal((prev) => !prev);

  return (
    <>
      <Box paddingLeft={6} paddingTop={4}>
        <Link to="/plugins/strapi-class" startIcon={<ArrowLeft />}>
          Back
        </Link>
      </Box>
      <Box paddingTop={6} paddingLeft={8}>
        <Stack horizontal spacing={3}>
          <Breadcrumbs label="Category model, name field">
            <Crumb>
              <Typography variant="beta">{courseName}</Typography>
            </Crumb>
            <Crumb>
              <Typography variant="beta">Lessons</Typography>
            </Crumb>
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      {/* <Flex justifyContent="end" paddingRight={10}>
        <Button onClick={() => setIsAddLessonModal((prev) => !prev)}>
          Add Lesson
        </Button>
      </Flex> */}

      <EditLessonModal
        lessonId={lessonId}
        isEditVisible={isEditLessonModal}
        handleCloseEditLessonModal={handleCloseEditModal}
        handleClickUpdateLesson={handleUpdateLesson}
      />
      <LessonTable
        id={courseId}
        isEditVisible={isEditLessonModal}
        handleLessonEdit={(lessonId) => handleLessonEditModal(lessonId)}
        courseName={courseName}
      />
    </>
  );
};

export default Lessons;
