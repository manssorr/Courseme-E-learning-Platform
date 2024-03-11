import { useRouter } from "next/router";
import { Divider, Steps } from "antd";
import { Paths } from "../../utils/dummyData";

const { Step } = Steps;

export default function Path(props) {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <div className="container header">
        <div className="row">
          <div className="col" style={{ height: "120px", margin: "50px 0" }}>
            <h1> {Paths[pid]?.title}</h1>
            <p>{Paths[pid]?.description}</p>
          </div>

          <div className="col"></div>
        </div>
      </div>

      <Divider />

      <div className="container">
        <div style={{ height: "700px", margin: "50px 0" }}>
          <Steps direction="vertical">
            {Paths[pid]?.courses ? (
              Paths[pid]?.courses?.map((course) => (
                <>
                  <Step
                    title={course?.name}
                    description="description about course."
                  />
                </>
              ))
            ) : (
              <h1>Comming SOON</h1>
            )}
          </Steps>
        </div>
      </div>
    </>
  );
}
