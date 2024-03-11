export const Paths = [
  {
    id: "0",

    title: "Web Development",
    description:
      "Learn how to build a modern web application with React and Next.js",
    icon: "https://img.icons8.com/color/48/000000/react.png",
    courses: [
      {
        id: "p1-c1",
        name: "HTML"
      },
      {
        id: "p1-c2",
        name: "CSS"
      },
      {
        id: "p1-c3",
        name: "JavaScript"
      }
    ]
  },
  {
    id: "p2",
    title: "Mobile Developer",
    courses: [
      {
        id: "p2-c1",
        name: "React Native",
        instructor: "John Doe"
      },
      {
        id: "p2-c2",
        name: "React",
        instructor: "John Doe"
      }
    ]
  },
  {
    id: "p3",
    title: "Full Stack Developer",
    courses: [
      {
        id: "p3-c1",
        name: "NodeJS",
        instructor: "John Doe"
      },
      {
        id: "p3-c2",
        name: "ExpressJS",
        instructor: "John Doe"
      },
      {
        id: "p3-c3",
        name: "MongoDB",
        instructor: "John Doe"
      }
    ]
  },
  {
    id: "p4",
    title: "Data Science"
  },
  {
    id: "p5",
    title: "Machine Learning"
  },
  {
    id: "p6",
    title: "Blockchain"
  }
];

export const categories = [
  {
    id: "cat1",
    name: "HTML",
    image: "https://img.icons8.com/color/48/000000/html-5.png",
    description:
      "HTML is the standard markup language for creating web pages and web applications. It is the structure and content of a webpage."
  },
  {
    id: "cat2",
    name: "CSS",
    image: "https://img.icons8.com/color/48/000000/css3.png",
    description:
      "CSS is a style sheet language used for describing the presentation of a document written in a markup language like HTML."
  },
  {
    id: "cat3",
    name: "JavaScript",
    image: "https://img.icons8.com/color/48/000000/javascript.png",
    description:
      "JavaScript is a lightweight, interpreted programming language with first-class functions. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm."
  },
  {
    id: "cat4",
    name: "React",
    image: "https://img.icons8.com/color/48/000000/react.png",
    description:
      "React is an open-source JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
  },
  {
    id: "cat5",
    name: "React Native",
    image: "https://img.icons8.com/color/48/000000/react-native.png",
    description:
      "React Native is a framework for building native apps using React. It lets you compose a rich mobile UI from declarative components using a simple API."
  },
  {
    id: "cat6",
    name: "NodeJS",
    image: "https://img.icons8.com/color/48/000000/nodejs.png",
    description:
      "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser."
  }
];
export const stepsCourse = [
  {
    id: "s1",
    title: "First Course",
    content: "First-content"
  },
  {
    id: "s2",
    title: "Second Course",
    content: "Second-content"
  },
  {
    id: "s3",
    title: "Third Course",
    content: "Last-content"
  },
  {
    id: "s4",
    title: "Last Course",
    content: "Last-content"
  }
];
export const quiz = {
  quizTitle: "Quiz",
  quizSynopsis:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      questionType: "photo",
      answers: [
        "https://dummyimage.com/600x400/000/fff&text=A",
        "https://dummyimage.com/600x400/000/fff&text=B",
        "https://dummyimage.com/600x400/000/fff&text=C",
        "https://dummyimage.com/600x400/000/fff&text=D"
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    }
  ]
};

export const cats = [
  "Digital Marketing",
  "Machine Learning",
  "Web development",
  "Embedded System",
  "Programming",
  "Engineering",
  "Photography",
  "Development",
  "Front-end",
  "Back-end",
  "Software",
  "Language",
  "Science",
  "Physics",
  "Design",
  "Videos",
  "React",
  "AI",
  "IT",
];
