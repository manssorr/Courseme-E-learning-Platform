import React from "react";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
  InfoCircleOutlined
} from "@ant-design/icons";

export default function CourseInfo() {
  return (
    <div className="d-flex justify-content-center p-5">
      <div className="text-center p-5">
        <InfoCircleOutlined className="text-primary display-1 p-5" />
        <p className="lead">This is a Course info</p>
      </div>
    </div>
  );
}
