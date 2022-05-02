import React, { useState, useEffect } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
} from "@strapi/design-system/Accordion";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Textarea } from "@strapi/design-system/Textarea";
import {
  Card,
  CardHeader,
  CardBody,
  CardCheckbox,
  CardAction,
  CardAsset,
  CardTimer,
  CardContent,
  CardBadge,
  CardTitle,
  CardSubtitle,
} from "@strapi/design-system/Card";

// import { singleCourseResponse } from "./constant";
import Editor from "./../Editor";
import { getSingleLesson } from "../../utils/apiCalls";

const ViewModal = ({ id, isVisible, handleCloseViewModal, courseName }) => {
  const [expandCourse, setExpandCourse] = useState(false);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [lessonVideo, setLessonVideo] = useState("");
  const [readingMaterial, setReadingMaterial] = useState("");

  useEffect(async () => {
    if (id) {
      const response = await getSingleLesson(id);
      console.log(response);
      if (response.data?.id) {
        setTitle(response.data?.title);

        setDescription(response.data?.description);
        setReadingMaterial(
          response.data?.readingMaterial?.id
            ? {
                name: response.data?.readingMaterial.name,
                url: response.data?.readingMaterial.url,
              }
            : ""
        );
        setLessonVideo(
          response.data?.video?.id
            ? { name: response.data?.video.name, url: response.data?.video.url }
            : ""
        );
      }
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleCloseViewModal} labelledBy="title">
          <ModalHeader>
            <Box>
              <Typography
                fontWeight="bold"
                variant="beta"
                textColor="neutral800"
                as="h2"
                id="title"
              >
                Preview Course
              </Typography>
            </Box>
          </ModalHeader>
          <ModalBody>
            <Box marginBottom={5}>
              <Grid gap={5}>
                <GridItem col={12}>
                  <TextInput
                    placeholder="Title of the Course"
                    label="Title"
                    name="title"
                    value={title}
                  />
                </GridItem>
                <GridItem col={12}>
                  <Typography variant="pi" fontWeight="bold">
                    Description
                  </Typography>
                  <Editor
                    name="description"
                    value={description}
                    handleChange={(target) => {}}
                  />
                </GridItem>
                <GridItem col={6}>
                  {readingMaterial ? (
                    <>
                      <Box paddingBottom={5}>
                        <Typography variant="pi" fontWeight="bold">
                          Reading Material
                        </Typography>
                      </Box>
                      <Card
                        style={{
                          width: "240px",
                        }}
                      >
                        <CardBody>
                          <CardContent paddingLeft={2}>
                            <CardTitle>{readingMaterial.name}</CardTitle>
                            <CardSubtitle>{courseName}</CardSubtitle>
                          </CardContent>
                          <CardBadge>Doc</CardBadge>
                        </CardBody>
                      </Card>
                    </>
                  ) : (
                    ""
                  )}
                </GridItem>
                <GridItem col={6}>
                  {lessonVideo ? (
                    <>
                      <Typography variant="pi" fontWeight="bold">
                        Course Video
                      </Typography>
                      <Card
                        style={{
                          width: "240px",
                        }}
                        id="second"
                      >
                        <CardHeader>
                          <video width="240" height="150" controls>
                            <source src={lessonVideo.url} type="video/mp4" />
                            <source src={lessonVideo.url} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </CardHeader>
                        <CardBody>
                          <CardContent>
                            <CardTitle>{lessonVideo.name}</CardTitle>
                          </CardContent>
                          <CardBadge>Video</CardBadge>
                        </CardBody>
                      </Card>
                    </>
                  ) : (
                    ""
                  )}
                </GridItem>
              </Grid>
            </Box>
            {/* <Box paddingTop={5}>
              <Typography variant="beta">
                Embed course to your Front-End Application
              </Typography>
            </Box>
            <Box paddingTop={2}>
              <Typography variant="epsilon">
                Fetch Single course details and its lesson, from the Api
                end-point mentioned below.
              </Typography>
            </Box>

            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`const response = await axios.get(
                   " ${window.location.origin}/strapi-class/getSingleCourse/${id}"
                  ) `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100" marginBottom={4}>
              <Accordion
                expanded={expandCourse}
                onToggle={() => setExpandCourse((s) => !s)}
                id="acc-1"
                size="S"
              >
                <AccordionToggle title="Sample course response object" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>
                      <pre>{JSON.stringify(singleCourseResponse, null, 2)}</pre>
                    </Typography>
                  </Box>
                </AccordionContent>
              </Accordion>
            </Box> */}
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseViewModal} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={handleCloseViewModal}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ViewModal;
