import React, { useState } from "react";
import { objectToArray, removeDuplicates } from "../utils/helpers";
import {
  DislikeOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeFilled
} from "@ant-design/icons";

const bookStyle = {
  backgroundColor: "#E3EDFF",
  borderRadius: "5px",
  padding: "5px",
  margin: "5px",
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  alignItems: "center",
  justifyContent: "center"
};

const Voting = () => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
      setDislike(false);
    }
  };

  const handleDislike = () => {
    if (dislike) {
      setDislike(false);
    } else {
      setDislike(true);
      setLike(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px"
      }}
    >
      {like ? (
        <LikeFilled
          onClick={handleLike}
          style={{
            fontSize: "16px",
            color: "black",
            cursor: "pointer"
          }}
        />
      ) : (
        <LikeOutlined
          onClick={handleLike}
          style={{
            fontSize: "16px",
            color: "green",
            cursor: "pointer"
          }}
        />
      )}

      {dislike ? (
        <DislikeFilled
          onClick={handleDislike}
          style={{
            fontSize: "16px",
            color: "black",
            cursor: "pointer"
          }}
        />
      ) : (
        <DislikeOutlined
          onClick={handleDislike}
          style={{
            fontSize: "16px",
            color: "red",
            cursor: "pointer"
          }}
        />
      )}
    </div>
  );
};

function RecBooks({ books }) {
  // Convert JSON to Object
  // const booksObj = JSON.parse(test);

  // Convert Object to Array
  const booksArray = objectToArray(books);
  // Remove deplicated elements
  const booksArrayUnique = removeDuplicates(booksArray);
  // Select only First 3 books
  const booksArrayFirst3 = booksArrayUnique.slice(0, 3);
  // Print out the books
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0px"
      }}
    >
      Recommended Books :
      {booksArrayFirst3.map((book, i) => (
        <p key={i} style={bookStyle}>
          {book}
          <Voting />
        </p>
      ))}
    </div>
  );
}

export default RecBooks;
