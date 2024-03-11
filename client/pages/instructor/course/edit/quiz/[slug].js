import { useState, Fragment, useEffect } from "react";

import { Modal, Button, Menu } from "antd";
import { useRouter } from "next/router";
import Quiz from "../../../../../components/QuizComponent/Quiz";
import QuizBuilder from "../../../../../components/QuizBuilder";
import QuizBreadcrumb from "../../../../../components/QuizBreadcrumb";
import axios from "axios";
import { toast } from "react-toastify";

const lessonsMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a rel="noopener noreferrer" href="#">
            General
          </a>
        )
      },
      {
        key: "2",
        label: (
          <a rel="noopener noreferrer" href="#">
            Layout
          </a>
        )
      },
      {
        key: "3",
        label: (
          <a rel="noopener noreferrer" href="#">
            Navigation
          </a>
        )
      }
    ]}
  />
);

export default function AddQuez() {
  // router
  const router = useRouter();

  const { slug, lessonId, lessonNO } = router.query;

  const [result, setResult] = useState(null);

  const [values, setValues] = useState({
    name: "",
    slug: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
    instructor: "",
    quiz: null
  });

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);

    if (data) setValues(data);
  };

  console.log("🚀 ~ router.query", router.query);

  const handleSubmitQuiz = async (quiz) => {
    const { data } = await axios.post(
      `/api/course/lesson/quiz/${slug}/${values.instructor._id}`,
      {
        lessonId,
        quiz
      }
    );

    // update ui
    if (data.ok) {
      toast("Quiz Added");
      () => router.back();
    } else {
      toast(data.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "120px",
          backgroundColor: "#E3EDFF",
          borderRadius: "5px",
          margin: "5px"
        }}
      >
        <h3>Add Quiz in this section</h3>
        <QuizBreadcrumb
          slug={slug}
          lessonId={lessonId}
          lessonNO={lessonNO}
          lessonTitle={values.lessons[lessonNO - 1]?.title}
          courseName={values.name}
          lessons={values.lessons}
          courseNavigation={() => router.back()}
        />
      </div>

      {/* QuizBuilder Form Here 👇👇 */}
      <QuizBuilder
        result={result}
        setResult={setResult}
        slug={slug}
        lessonId={lessonId}
        lessonTitle={values.lessons[lessonNO - 1]?.title}
        courseName={values.name}
        handleSubmitQuiz={handleSubmitQuiz}
      />
    </>
  );
}
