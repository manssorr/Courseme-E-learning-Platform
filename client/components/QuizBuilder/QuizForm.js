import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import range from "lodash/range";
import validate from "./validate";
import { AiFillCloseCircle } from "react-icons/ai";
// import "./style.css"

class QuizForm extends Component {
  renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    //quiz title input
    <div>
      <label className="mt-3">{label}</label>
      <div>
        <input
          {...input}
          type={type}
          placeholder={label}
          className="form-control square"
        />
        {touched && error && <span className="text-danger">{error}*</span>}
      </div>
    </div>
  );

  renderInputFieldWithX = ({
    fields,
    input,
    label,
    type,
    index,
    meta: { touched, error }
  }) => (
    //quiz title input
    <div>
      <label className="mt-3">{label}</label>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "row",
            flexGrow: 1
          }}
        >
          <input
            {...input}
            type={type}
            placeholder={label}
            className="form-control square"
          />
          <AiFillCloseCircle
            className="mt-3 text-danger"
            style={{ cursor: "pointer", fontSize: "2rem" }}
            type="button"
            title="Remove Answer"
            onClick={() => fields.remove(index)}
          />
        </div>
        {touched && error && <span className="text-danger">{error}*</span>}
      </div>
    </div>
  );

  renderTextareaField = ({
    placeholder,
    input,
    label,
    type,
    meta: { touched, error }
  }) => (
    //quiz synopsis input
    <div>
      <label className="mt-3">{label}</label>
      <div>
        <textarea
          className="form-control "
          {...input}
          type={type}
          placeholder={placeholder || label}
        />
        {touched && error && <span className="text-danger">{error}*</span>}
      </div>
    </div>
  );

  renderSelectField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children
  }) => (
    <div>
      <label className="mt-3">{label}</label>
      <div>
        <select {...input}>{children}</select>
        {touched && error && <span className="text-danger">{error}*</span>}
      </div>
    </div>
  );

  renderSelectQuestionTypeField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children
  }) => (
    <div>
      <label className="mt-3">{label}</label>
      <div>
        <select {...input}>{children}</select>
        {touched && error && <span className="text-danger">{error}*</span>}
      </div>
    </div>
  );

  renderTextAnswers = ({ fields, question, meta: { error } }) => (
    <ul className="list-unstyled mt-3">
      <li className="">
        <button
          className="btn mt-3"
          style={{ backgroundColor: "#E3EDFF" }}
          type="button"
          onClick={() => fields.push()}
        >
          Add Answer
        </button>
      </li>

      {fields.map((answer, index) => (
        <>
          <div key={index}>
            <Field
              name={answer}
              type="text"
              fields={fields}
              component={this.renderInputFieldWithX}
              label={`Answer #${index + 1}`}
              index={index}
            />
          </div>
        </>
      ))}

      <li>
        <Field
          name={`${question}.correctAnswer`}
          component={this.renderSelectField}
          label="Correct Answer"
        >
          <option value="">Please select correct answer</option>
          {fields.map((answer, index) => (
            <option key={index + 1} value={index + 1}>{`Answer #${
              index + 1
            }`}</option>
          ))}
        </Field>
      </li>

      {error && <li className="error">{error}</li>}
    </ul>
  );

  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul className="list-unstyled mt-3">
      {fields.map((question, index) => (
        <li key={index}>
          <button
            className="btn"
            type="button"
            title="Remove Question"
            onClick={() => fields.remove(index)}
          />
          <h4>Question #{index + 1}</h4>
          <Field
            name={`${question}.question`}
            type="text"
            component={this.renderInputField}
            label="Question Title"
          />
          <select
            className="select mt-3 btn btn-primary dropdown-toggle"
            name={`${question}.questionType`}
            component={this.renderSelectQuestionTypeField}
            label="Question Type"
          >
            <option value=""> Please select a question type </option>
            <option value="text">Text</option>
            <option value="photo">Photo</option>
          </select>
          <FieldArray
            name={`${question}.answers`}
            component={this.renderTextAnswers}
            question={question}
          />

          <Field
            name={`${question}.messageForCorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Correct Answer"
          />
          <Field
            name={`${question}.messageForIncorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Incorrect Answer"
          />
          <Field
            name={`${question}.explanation`}
            type="text"
            component={this.renderTextareaField}
            label="Explanation"
          />
          <Field
            name={`${question}.point`}
            type="number"
            component={this.renderInputField}
            label="Point"
          />
        </li>
      ))}
      <li>
        <button
          className="btn btn-primary mt-3 mr-2 "
          type="button"
          onClick={() => fields.push({})}
          style={{ width: "100%" }}
        >
          Add Question
        </button>
        {(touched || submitFailed) && error && (
          <span className="text-danger">{error}*</span>
        )}
      </li>
    </ul>
  );

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <>
        <div className="container" style={{ width: "500px" }}>
          <div className="QuizForm">
            <form name="quiz-form" onSubmit={handleSubmit}>
              <Field
                name="quizTitle"
                type="text"
                component={this.renderInputField}
                label="Quiz Title"
              />
              <Field
                name="quizSynopsis"
                type="text"
                component={this.renderTextareaField}
                label="Quiz Synopsis"
                placeholder="A synopsis is a brief summary"
              />
              <FieldArray name="questions" component={this.renderQuestions} />
              <div>
                <button
                  style={{
                    backgroundColor: "#0f52ba",
                    width: "80%",
                    border: "none"
                  }}
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </button>
                <button
                  className="btn btn-secondary ml-2"
                  style={{
                    width: "18%",
                    backgroundColor: "#d21f3c",
                    border: "none"
                  }}
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

QuizForm = reduxForm({
  form: "quizForm",
  validate
})(QuizForm);

const selector = formValueSelector("quizForm");

QuizForm = connect((state) => {
  const questions = selector(state, "questions");
  const questionType =
    questions && questions.map((question) => question.questionType);

  return { questionType: questionType };
})(QuizForm);

export default QuizForm;
