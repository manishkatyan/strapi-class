import React, { useState, useEffect } from "react";
import { useLocation, useRouteMatch, Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { IconButton } from "@strapi/design-system/IconButton";
import {
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
} from "@strapi/design-system/Pagination";
import { LinkButton } from "@strapi/design-system/LinkButton";
import { Badge } from "@strapi/design-system/Badge";
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";
import CarretUp from "@strapi/icons/CarretUp";
import CarretDown from "@strapi/icons/CarretDown";
import Plus from "@strapi/icons/Plus";
import NumberList from "@strapi/icons/NumberList";
import Gift from "@strapi/icons/Gift";
import Eye from "@strapi/icons/Eye";
import { getCourse, deleteCourse } from "../../utils/apiCalls";
import EmbedCodeModal from "./embedCodeModal";
import ConfirmDialog from "../ConfirmDialog";
import AddLessonModal from "../Lesson/addLessonModal";

const limit = 6;

const CourseTable = ({ isVisible, isEditVisible, handleCourseEdit }) => {
  const { url } = useRouteMatch();
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");
  const pageNumber = page ? parseInt(page) : 1;
  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * limit;

  const [sortAscendingTitle, setSortAscendingTitle] = useState(true);
  const [sortAscendingDate, setSortAscendingDate] = useState(true);
  const [totalCount, setTotalCount] = useState();
  const [orderByTitle, setOrderByTitle] = useState(true);
  const [orderByDate, setOrderByDate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEmbedModal, setIsEmbedModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState("");
  const [courseIdToEmbed, setCourseIdToEmbed] = useState("");
  const [isAddLessonModal, setIsAddLessonModal] = useState(false);
  const [courseIdToAddLesson, setCourseIdToAddLesson] = useState("");

  const pageCount = Math.ceil(totalCount / limit);

  useEffect(async () => {
    let sort, order;
    if (orderByTitle) {
      sort = "title";
      order = sortAscendingTitle ? "asc" : "desc";
    } else if (orderByDate) {
      sort = "date";
      order = sortAscendingDate ? "asc" : "desc";
    }

    const response = await getCourse(offset, limit, sort, order);
    if (response.data?.res) {
      setTableData(response.data.res);
      setTotalCount(response.data.count);
    }
  }, [
    isVisible,
    isEditVisible,
    sortAscendingTitle,
    sortAscendingDate,
    offset,
    isConfirmModal,
  ]);

  const handleSortTitleCarretUp = () => {
    setSortAscendingTitle(false);
    setOrderByTitle(true);
    setOrderByDate(false);
  };

  const handleSortTitleCarretDown = () => {
    setSortAscendingTitle(true);
    setOrderByTitle(true);
    setOrderByDate(false);
  };

  const handleSortDateCarretUp = () => {
    setSortAscendingDate(false);
    setOrderByTitle(false);
    setOrderByDate(true);
  };

  const handleSortDateCarretDown = () => {
    setSortAscendingDate(true);
    setOrderByTitle(false);
    setOrderByDate(true);
  };

  const getCourseCreatedDate = (date) => {
    const dates = new Date(date);

    // get the date as a string
    const createdDate = dates.toDateString();

    // get the time as a string
    const createdTime = dates.toLocaleTimeString();
    const dateTime = (
      <Badge>
        {createdDate}&nbsp;&nbsp;&nbsp;{createdTime}
      </Badge>
    );
    return dateTime;
  };

  const handleCloseModal = () => setIsEmbedModal((prev) => !prev);

  const handleCloseDialog = () => setIsConfirmModal((prev) => !prev);

  const handleCloseLessonModal = () => setIsAddLessonModal((prev) => !prev);
  const handleAddLesson = () => setIsAddLessonModal((prev) => !prev);

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    setIsConfirmModal((prev) => !prev);
  };

  return (
    <>
      <EmbedCodeModal
        id={courseIdToEmbed}
        isVisible={isEmbedModal}
        handleCloseEmbedModal={handleCloseModal}
      />
      <AddLessonModal
        courseId={courseIdToAddLesson}
        isVisible={isAddLessonModal}
        handleCloseAddLessonModal={handleCloseLessonModal}
        handleClickAddLesson={handleAddLesson}
      />
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">Title</Typography>
                {sortAscendingTitle ? (
                  <IconButton
                    onClick={handleSortTitleCarretUp}
                    label="sort by Title"
                    noBorder
                    icon={<CarretUp />}
                  />
                ) : (
                  <IconButton
                    onClick={handleSortTitleCarretDown}
                    label="sort by Title"
                    noBorder
                    icon={<CarretDown />}
                  />
                )}
              </Th>
              <Th>
                <Typography variant="sigma">Lesson</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">Created Date</Typography>
                {sortAscendingDate ? (
                  <IconButton
                    onClick={handleSortDateCarretUp}
                    label="sort by Created Date"
                    noBorder
                    icon={<CarretUp />}
                  />
                ) : (
                  <IconButton
                    onClick={handleSortDateCarretDown}
                    label="sort by Created Date"
                    noBorder
                    icon={<CarretDown />}
                  />
                )}
              </Th>

              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData &&
              tableData.map((data) => (
                <Tr key={data.id}>
                  <Td>
                    <Typography
                      textColor="neutral800"
                      textTransform="capitalize"
                    >
                      {data.title}
                    </Typography>
                  </Td>
                  <Td>
                    <LinkButton
                      variant="secondary"
                      size="S"
                      endIcon={<Plus />}
                      onClick={() => {
                        setCourseIdToAddLesson(data.id);
                        setIsAddLessonModal((prev) => !prev);
                      }}
                    >
                      Add
                    </LinkButton>{" "}
                    &nbsp;
                    <LinkButton
                      variant="secondary"
                      size="S"
                      endIcon={<NumberList />}
                      to={`strapi-class/lessons/${data.id}/${data.title}`}
                    >
                      List
                    </LinkButton>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {getCourseCreatedDate(data.createdAt)}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        label="preview Course"
                        icon={<Eye />}
                        onClick={() => {
                          setCourseIdToEmbed(data.id);
                          setIsEmbedModal((prev) => !prev);
                        }}
                      />
                      <Box paddingLeft={2}>
                        <IconButton
                          onClick={() => handleCourseEdit(data.id)}
                          label="Edit"
                          // noBorder
                          icon={<Pencil />}
                        />
                      </Box>

                      <Box paddingLeft={2}>
                        <IconButton
                          onClick={() => {
                            setCourseIdToDelete(data.id);
                            setIsConfirmModal((prev) => !prev);
                          }}
                          label="Delete"
                          // noBorder
                          icon={<Trash />}
                          data-toggle="dialog"
                          data-target={`#delete_${data.id}`}
                        />
                      </Box>
                      <ConfirmDialog
                        dialogId={`delete_${courseIdToDelete}`}
                        isVisible={isConfirmModal}
                        handleClose={handleCloseDialog}
                        handleDelete={() =>
                          handleDeleteCourse(courseIdToDelete)
                        }
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent="end" paddingRight={8}>
        {pageCount ? (
          <Pagination activePage={pageNumber} pageCount={pageCount}>
            <PreviousLink to={`/plugins/strapi-class?page=${pageNumber - 1}`}>
              Go to previous page
            </PreviousLink>
            {[...Array(pageCount)].map((count, idx) => (
              <PageLink
                number={idx + 1}
                to={`/plugins/strapi-class?page=${idx + 1}`}
              >
                Go to page 1
              </PageLink>
            ))}

            <NextLink to={`/plugins/strapi-class?page=${pageNumber + 1}`}>
              Go to next page
            </NextLink>
          </Pagination>
        ) : (
          ""
        )}
      </Flex>
    </>
  );
};

export default CourseTable;
