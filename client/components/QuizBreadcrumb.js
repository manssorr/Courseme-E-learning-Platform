import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Menu, Tooltip } from "antd";
import { BiHomeHeart } from "react-icons/Bi";

/*
  http://127.0.0.1:3000/instructor/course/edit/quiz/

  resume-(cv)-writinghacking-for-freelancers-and-entrepreneurs

  ?lessonId=62b3bacee98fbd05e4fa4e60

  &lessonNO=1

 */
const QuizBreadcrumb = ({
  slug,
  lessonId,
  courseName = "Course",
  lessonNO = "0",
  lessonTitle = "LessonTitle",
  courseNavigation,
  lessons = []
}) => {
  const menu = (
    <Menu>
      {lessons.map((lesson, index) => (
        <Menu.Item key={index}>
          {lessonNO == index + 1 ? (
            <a
              rel="noopener noreferrer"
              href={`/instructor/course/edit/quiz/${slug}?lessonId=${
                lesson._id
              }&lessonNO=${index + 1}`}
              style={{ color: "red" }}
            >
              {index + 1} - {lesson.title}
            </a>
          ) : (
            <a
              rel="noopener noreferrer"
              href={`/instructor/course/edit/quiz/${slug}?lessonId=${
                lesson._id
              }&lessonNO=${index + 1}`}
            >
              {index + 1} - {lesson.title}
            </a>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <Tooltip title="Back HOME">
          <BiHomeHeart />
          HOME
        </Tooltip>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Tooltip title="Back to edit course">
          <a onClick={courseNavigation}>{courseName}</a>
        </Tooltip>
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menu}>
        <Tooltip title="Add Quiz to different lesson">
          <a href="#">
            {lessonNO} - {lessonTitle}
          </a>
        </Tooltip>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Add Quiz</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default QuizBreadcrumb;
