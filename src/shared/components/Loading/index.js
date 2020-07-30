import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

export default function LoadingComponent({ loading }) {
  return (
    <div>
      <Card loading={loading} />
    </div>
  );
}

LoadingComponent.propTypes = {
  loading: PropTypes.bool,
};

LoadingComponent.defaultProps = {
  loading: false,
};
