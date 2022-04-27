import React from "react";
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

const EmbedCodeModal = ({ isVisible, handleCloseEmbedModal }) => {
  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleCloseEmbedModal} labelledBy="title">
          <ModalHeader>
            <Flex direction="column" alignItems="start">
              <Box>
                <Typography
                  fontWeight="bold"
                  variant="beta"
                  textColor="neutral800"
                  as="h2"
                  id="title"
                >
                  Embed Code
                </Typography>
              </Box>
              <Box>
                <Typography variant="omega">
                  Display all your courses in your front app by following the
                  simple steps mentioned below:
                </Typography>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Typography variant="epsilon">
              Fetch all the course details, from the Api end-pointmentioned
              below.
            </Typography>

            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`const response = await axios.get(
                   " ${window.location.origin}/strapi-class/getCourse"
                  ) `}
              </Typography>
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEmbedModal} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={handleCloseEmbedModal}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EmbedCodeModal;
