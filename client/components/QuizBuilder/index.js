import QuizForm from "./QuizForm";
import QuizFormResult from "./QuizFormResult";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Provider } from "react-redux";

import store from "./store";

const test = {
  quizTitle: "ewfewf",
  quizSynopsis: "ewfwefwefwe",
  questions: [
    {
      question: "ewfewfewf",
      answers: ["wefwfew"],
      correctAnswer: "1",
      messageForCorrectAnswer: "efwfe",
      messageForIncorrectAnswer: "wefwef",
      explanation: "ewfwef",
      point: "34"
    }
  ]
};

export default function QuizBuilder(props) {
  const { result, setResult, slug, current, handleSubmitQuiz } = props;

  const handleSubmit = (values) => {
    setResult(JSON.stringify(values, null, 2));
    setResult(values);
  };
 
  return (
    <Provider store={store}>
      {/* QuizBuilder Form Here 👇👇 */}
      <QuizForm onSubmit={handleSubmitQuiz} />

      {/* <QuizFormResult result={test} /> */}
    </Provider>
  );
}
