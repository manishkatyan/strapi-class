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
import { getLesson } from "../../utils/apiCalls";

const limit = 6;

const LessonTable = ({ id, isVisible, isEditVisible, handleCourseEdit }) => {
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

    const response = await getLesson(id, offset, limit, sort, order);

    if (response.data?.res) {
      setTableData(response.data.res);
      setTotalCount(response.data.count);
    }
  }, [isVisible, isEditVisible, sortAscendingTitle, sortAscendingDate, offset]);

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

  const getLessonCreatedDate = (date) => {
    const dates = new Date(date);

    // get the date as a string
    const createdDate = dates.toDateString();

    // get the time as a string
    const createdTime = dates.toLocaleTimeString();
    const dateTime = (
      <Badge active>
        {createdDate}&nbsp;&nbsp;&nbsp;{createdTime}
      </Badge>
    );
    return dateTime;
  };

  return (
    <>
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
                    <Typography textColor="neutral800">
                      {getLessonCreatedDate(data.createdAt)}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => handleCourseEdit(data.id)}
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />
                      <IconButton
                        onClick={() => console.log("delete")}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                      {/* <Box paddingLeft={2}>
                        <IconButton
                          label="Embed Code"
                          icon={<Gift />}
                          onClick={() => setIsEmbedModal((prev) => !prev)}
                        />
                      </Box> */}
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

export default LessonTable;
