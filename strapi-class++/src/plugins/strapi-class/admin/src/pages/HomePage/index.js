/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import Course from "../../components/Course";

const HomePage = () => {
  return (
    <div>
      <Course />
    </div>
  );
};

export default memo(HomePage);
