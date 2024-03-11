import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import CourseInfo from "../../../components/courseInfo";
import { Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import { Button } from "react-bootstrap";
import Quiz from "../../../../client/components/QuizComponent/Quiz";
import { quiz } from "../../../../client/utils/dummyData";

import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
  InfoCircleOutlined,
  InfoCircleFilled
} from "@ant-design/icons";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id
    });
    console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StudentRoute>
      <div className="row">
        {/* Side Bar */}
        <div style={{ maWidth: 320 }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className=" mt-1 btn-block mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px"
            }}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflowY: "auto" }}
          >
            <Item
              key={-1}
              onClick={() => setClicked(-1)}
              icon={<Avatar size={36}>{0}</Avatar>}
            >
              Info
              <InfoCircleFilled
                className="float-right text-primary ml-2"
                style={{ marginTop: "13px" }}
              />
            </Item>
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar size={36}>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}{" "}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="float-right text-primary ml-2"
                    style={{ marginTop: "13px" }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger ml-2"
                    style={{ marginTop: "13px" }}
                  />
                )}
              </Item>
            ))}
          </Menu>
        </div>

        {/* Course Content */}
        <div className="col">
          {clicked !== -1 ? (
            <>
              {/* Mark as completed bar */}
              <div
                className="col alert alert-primary square"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="float-right pointer"
                    onClick={markIncompleted}
                  >
                    Mark as incomplete
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="float-right pointer"
                    onClick={markCompleted}
                  >
                    Mark as completed
                  </Button>
                )}
              </div>
              {/* Course Video */}
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div
                      className="wrapper"
                      style={{
                        display: "flex",
                        maxWidth: "100%",
                        justifyContent: "center"
                      }}
                    >
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="90%"
                        maxHeight="1200px"
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                  </>
                )}

              {/* Content & Quiz */}
              <div className="mt-5 container" style={{ width: "70%" }}>
                <ReactMarkdown
                  source={course.lessons[clicked].content}
                  className="single-post"
                />
                <div
                  className=" mt-5 mb-2"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* Quiz */}
                  {course.lessons[clicked]?.quiz ? (
                    <Quiz quiz={course.lessons[clicked].quiz} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "red"
                      }}
                    >
                      No Quiz for this lesson
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <CourseInfo />
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
