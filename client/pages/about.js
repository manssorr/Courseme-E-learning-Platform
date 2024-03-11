import { Group, Image } from "@mantine/core";

const about = ({ courses }) => {
  return (
    <div className="container">
      <div
        className="row"
        style={{
          hight: "90px",
          marginTop: "100px",
          margin: "auto",
          marginRight: "auto",
          marginLeft: "-10px",
        }}
      >
        <div
          className="col  align-items-center "
          style={{
            hight: "50px",
            margin: "auto",
            padding: "50px",
            marginLeft: "0",
            marginRight: "auto",
            maxWidth: "40vw",
            columnGap: "50px",
          }}
        >
          <Group>
            <h4>Our platform</h4>
            <h5>
              for people of a variety of ages containing a lot of categories &
              fields such as development, designing, finance, etc. we want to
              reach the most number of people possible and help them reach their
              goals. We are planning to make an easy-to-use website for people
              of different ages. Courses are going to be divided into different
              parts (weeks). Tasks are going to be implemented between videos in
              the week's section, Quizzes will be made between weeks if
              applicable by the professor
            </h5>
          </Group>
        </div>

        <div
          className="col "
          style={{
            hight: "150px",
            margin: "auto",
            marginTop: "auto",
            marginLeft: "10px",
            marginRight: "auto",
            maxWidth: "230vw",
            columnGap: "10px",
          }}
        >
          <Image src="../platform.jpg" />
        </div>
      </div>
      <div
        className="row"
        style={{
          hight: "200px",
          marginTop: "100px",
          margin: "auto",
          marginLeft: "-120px",
          marginRight: "auto",
        }}
      >
        <div
          className="col align-items-center "
          style={{
            hight: "100px",
            margin: "80",
            padding: "5px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "50vw",
            columnGap: "10px",
          }}
        >
          <div
            className="row"
            style={{
              hight: "70px",
              margin: "auto",
              padding: "5px",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "15vw",
              columnGap: "10px",
            }}
          >
            <Image src="../student.jpg" />
          </div>
          <div
            className="row"
            style={{
              hight: "70px",
              margin: "auto",
              padding: "5px",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "15vw",
              columnGap: "10px",
            }}
          >
            <Image src="../student3.jpg" />
          </div>
        </div>

        <div
          className="col align-items "
          style={{
            hight: "60px",
            margin: "20px",
            marginTop: "50px",
            marginLeft: "-150px",
            marginRight: "auto",
            maxWidth: "15vw",
            columnGap: "10px",
          }}
        >
          <div
            className="row"
            style={{
              hight: "40px",
              margin: "auto",
              padding: "5px",
              maxWidth: "15vw",
              columnGap: "10px",
            }}
          >
            <Image src="../student2.jpg" />
          </div>
          <div
            className="row"
            style={{
              hight: "40px",
              margin: "auto",
              padding: "5px",
              maxWidth: "15vw",
              columnGap: "10px",
            }}
          >
            <Image src="../student4.jpg" />
          </div>
        </div>

        <div
          className="col  align-items-center "
          style={{
            hight: "90px",
            margin: "auto",
            padding: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "70vw",
            columnGap: "100px",
          }}
        >
          <Group>
            <h5>
              <h4>Our students</h4>a community of global learners united in a
              shared goal of uplift and transformation. Our unique learning
              model enables an unprecedented degree of engagement with our
              students, and we are with them through every step of their
              learning journey—from the first moment a marketing team member
              might answer a question on Facebook, to the penultimate moment
              when a career team member receives word that a graduate has gotten
              a new job. Our mantra is Students First, and this is the light
              that guides us as we continue our mission to bring the highest
              quality learning possible, to as many students as we can possibly
              reach.
            </h5>
          </Group>
        </div>
      </div>
    </div>
  );
};
export default about;
