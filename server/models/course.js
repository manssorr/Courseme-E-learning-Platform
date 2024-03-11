import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

// {
//   "quizTitle": "ewfewf",
//   "quizSynopsis": "ewfwefwefwe",
//   "questions": [
//     {
//       "question": "ewfewfewf",
//       "answers": [
//         "wefwfew"
//       ],
//       "correctAnswer": "1",
//       "messageForCorrectAnswer": "efwfe",
//       "messageForIncorrectAnswer": "wefwef",
//       "explanation": "ewfwef",
//       "point": "34"
//     }
//   ]
// }

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    default: "text"
  },
  answers: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  },
  messageForCorrectAnswer: {
    type: String,
    default: "Correct Answer"
  },
  messageForIncorrectAnswer: {
    type: String,
    default: "Incorrect Answer"
  },
  explanation: {
    type: String,
    default: "No explanation available"
  },
  point: {
    type: Number,
    default: 1
  }
});

const quizSchema = new mongoose.Schema(
  {
    quizTitle: {
      type: String,
      required: true
    },
    quizSynopsis: {
      type: String
    },
    questions: [questionSchema],
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      // minlength: 3,
      maxlength: 320,
      required: true
    },
    slug: {
      type: String,
      lowercase: true
    },
    content: {
      type: {},
      minlength: 200
    },
    video: {},
    free_preview: {
      type: Boolean,
      default: false
    },
    quiz: {
      type: quizSchema,
      default: null
    }
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true
    },
    reference: {
      type: String,
      trim: true,
      required: true
    },
    slug: {
      type: String,
      lowercase: true
    },
    description: {
      type: {},
      minlength: 200,
      required: true
    },
    price: {
      type: Number,
      default: 9.99
    },
    image: {},
    category: String,
    published: {
      type: Boolean,
      default: false
    },
    paid: {
      type: Boolean,
      default: true
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    lessons: [lessonSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
