import { Button, Checkbox, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove
}) => {
  const [showFormQuestion, setShowFormQuestion] = useState(false);
  const [answers, setAnswers] = useState([{ Answer: "", isCorrect: false }]);
  const [questions, setQuestions] = useState([{ Question: "", answers: [] }]);

  //form question
  const showFormQuestionHandler = () => {
    setShowFormQuestion(true);
  };
  const hideFormQuestionHandler = () => {
    setShowFormQuestion(false);
    //remove last Answer
    setAnswers([{ Answer: "", isCorrect: false }]);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { Answer: "", isCorrect: false }]);
  };
  const handleRemoveAnswer = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };
  const handleAnswerChange = (index, value) => {
    setAnswers(
      answers.map((answer, i) => (i === index ? { Answer: value } : answer))
    );
  };
  const handleAnswerCorrect = (index) => {
    setAnswers(
      answers.map((answer, i) =>
        i === index ? { ...answer, isCorrect: !answer.isCorrect } : answer
      )
    );
  };

  const handler = (e) => {
    e.preventDefault();
    console.log(values);
  };

  // Quiz Components

  // Question component
  // const Question = ({ question, index }) => {
  //   return (
  //     <>
  //       <h6 className="mt-3 font-weight-bold"> Add Question </h6>
  //       {/* Question */}
  //       <input
  //         type="text"
  //         className="form-control square mt-3"
  //         onChange={(e) =>
  //           setValues({
  //             ...values,
  //             questions: [
  //               ...questions,
  //               { Question: e.target.value, answers: [] }
  //             ]
  //           })
  //         }
  //         placeholder="Question"
  //         autoFocus
  //       />

  //       {answers.map((answer, index) => (
  //         <Answer key={index} question={index} index={index} answer={answer} />
  //       ))}
  //       <QuestionAdder />
  //     </>
  //   );
  // };
  // // Answer component
  // const Answer = ({ question, index, answer }) => {
  //   return (
  //     <>
  //       <div className="row">
  //         <div className="col-md-10">
  //           <input
  //             value={answer.Answer}
  //             key={index}
  //             type="text"
  //             className="form-control square mt-3"
  //             onChange={(e) => handleAnswerChange(index, e.target.value)}
  //             placeholder="Answer"
  //             autoFocus
  //           />
  //           <Checkbox
  //             className="mt-2"
  //             onChange={() => handleAnswerCorrect(index)}
  //             checked={answer.isCorrect}
  //           >
  //             Correct
  //           </Checkbox>
  //         </div>

  //         {answers.length > 1 && (
  //           <AiFillCloseCircle
  //             className="mt-3 text-danger  "
  //             onClick={() => handleRemoveAnswer(index)}
  //             style={{ cursor: "pointer", fontSize: "2rem" }}
  //           />
  //         )}
  //       </div>
  //       {answers.length - 1 === index && answers.length < 4 && <AnswerAdder />}
  //     </>
  //   );
  // };
  // // Add Question component
  // const QuestionAdder = ({ isFirst = false }) => {
  //   return (
  //     <>
  //       {isFirst ? (
  //         <button
  //           type="button"
  //           className="btn btn-primary mt-3 mb-3 "
  //           onClick={showFormQuestionHandler}
  //           style={{ width: "100%" }}
  //         >
  //           Add Question !
  //         </button>
  //       ) : (
  //         <div className="row">
  //           <div className="col-md-10">
  //             <button
  //               type="button"
  //               className="btn btn-primary mt-3 mb-3 "
  //               style={{ width: "100%" }}
  //             >
  //               Add another question
  //             </button>
  //           </div>
  //           <div className="col-md-2">
  //             <AiFillCloseCircle
  //               className="mt-3 text-danger  "
  //               onClick={hideFormQuestionHandler}
  //               style={{ cursor: "pointer", fontSize: "2.5rem" }}
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };
  // // Add Answer component
  // const AnswerAdder = () => {
  //   return (
  //     <>
  //       <button
  //         type="button"
  //         className="btn btn-primary mt-3 mb-3 "
  //         onClick={handleAddAnswer}
  //       >
  //         Add Answers
  //       </button>
  //     </>
  //   );
  // };

  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
      {/* <form onSubmit={handler}> */}
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        {/* Lesson Content */}
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        />

        {/* Search on ternary operator Vs inline if condition in react */}
        {/* {showFormQuestion ? <Question /> : <QuestionAdder isFirst={true} />} */}

        {/* uploading video */}
        <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        {/* submit button */}
        <Button
          onClick={handleAddLesson}
          // onClick={handler}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
          style={{ backgroundColor: "#2d5ebe" }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
