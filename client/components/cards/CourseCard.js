import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category, createdAt } =
    course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-3"
          style={{ borderRadius: "10px", minHeight: "50vh" }}
          hoverable
          cover={
            <img
              src={image?.Location}
              alt={name}
              style={{
                height: "200px",
                objectFit: "cover",
                width: "100%",
                borderStartStartRadius: "10px",
                borderStartEndRadius: "10px"
              }}
            />
          }
        >
          <h6 className="font-weight-bold">{name}</h6>
          <p>by {instructor.name}</p>
          <h6 style={{ fontSize: "12px" }}>
            Created At: {createdAt.substring(0, 10)}
          </h6>

          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          <h6 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd"
                })
              : "Free"} (0 of 5⭐)
          </h6>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
