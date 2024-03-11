import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DollarCircleFilled,
  EditOutlined,
  LockOutlined,
  MinusCircleTwoTone,
  StarOutlined,
  StopOutlined,
  UnlockOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Tag,
  Avatar,
  Tooltip,
  Form,
  Input,
  Radio,
  InputNumber,
  Select,
  Badge
} from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function InstructorsTable(props) {
  const { tableData, setReFetch, courses } = props;
  const [form] = Form.useForm();

  const [coursesLimit, setCoursesLimit] = useState(2);

  const [activeExpRow, setActiveExpRow] = useState();

  const [filteredInfo, setFilteredInfo] = useState({});

  const coursesFiltersBuilder = useCallback(
    (dataToBuildFrom) => {
      let filters = [];
      dataToBuildFrom.forEach((user) => {
        if (user?.courses?.length > 0) {
          user.courses.forEach((course) => {
            if (!filters.some((filter) => filter.value === course?.name)) {
              filters.push({
                text: course.name,
                value: course.name
              });
            }
          });
        }
      });
      return [...new Set(filters)];
      // return filters;
    },
    [filteredInfo]
  );

  const modifiedData = tableData?.map((item) => ({
    ...item,
    key: item._id
  }));

  const printCoursesWithLimit = useCallback((courses, limit) => {
    let coursesToPrint = courses.slice(0, limit);
    if (coursesToPrint?.length < courses?.length) {
      coursesToPrint.push({
        text: `+${courses?.length - coursesToPrint?.length} more`,
        value: "more"
      });
    }
    return coursesToPrint;
  }, []);

  const getThisInstructorsCourses = useCallback(
    (instructor) => {
      console.log("🚀 ~ instructor", courses);

      const filteredCourses = courses.filter(
        (course) => course?.instructor?._id === instructor._id
      );
      return filteredCourses;
    },
    [tableData, courses]
  );

  function localDay(time) {
    const minutesOffset = time.getTimezoneOffset();
    const millisecondsOffset = minutesOffset * 60 * 1000;
    const local = new Date(time - millisecondsOffset);
    return local.toISOString().substr(0, 10);
  }

  const CourseTag = ({ course }) => {
    return (
      <Tag
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginRight: "5px",
          padding: "5px"
        }}
        color={course?.published ? "success" : "error"}
        key={course?._id}
      >
        <Link href={`/course/${course.slug}`}>
          <a>
            <Avatar
              style={{
                marginRight: "5px"
              }}
              src={course?.image?.Location}
            />
            <span
              style={{
                marginRight: "5px",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              {course?.name}
            </span>
            <Tooltip
              title={course?.paid ? "Course is paid 🤑" : "Course is FREE"}
            >
              <DollarCircleFilled
                style={{
                  fontSize: "20px",
                  color: course?.paid ? "green" : "gray"
                }}
              />
            </Tooltip>
          </a>
        </Link>
      </Tag>
    );
  };

  const coursesColumns = [
    // name
    {
      title: "Instructor Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center"
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <Tooltip title="Instructor name">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                {record?.blocked ? (
                  <StopOutlined type="danger" />
                ) : (
                  <UserOutlined />
                )}{" "}
                <a>{text}</a>
              </span>
            </Tooltip>
          </span>
        </span>
      ),

      sorter: (a, b) => a.name.length - b.name.length
    },

    // email
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Tooltip title="Instructor e-mail">
          <span>{text}</span>
        </Tooltip>
      ),

      sorter: (a, b) => a.name.length - b.name.length
    },

    // Course = Tag + badge coursesLimit, setCoursesLimit
    {
      title: "This Instructor Courses",
      dataIndex: "courses",
      key: "courses",

      filters: coursesFiltersBuilder(tableData),
      onFilter: (value, record) =>
        record.courses?.some((course) => course?.name === value),
      render: (text, record) => (
        <span>
          {getThisInstructorsCourses(record)?.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              {printCoursesWithLimit(
                getThisInstructorsCourses(record),
                coursesLimit
              )?.map((course, index) =>
                index < coursesLimit ? (
                  <CourseTag course={course} key={course?._id} />
                ) : (
                  <Tooltip title="View 3 more">
                    <Button
                      style={{
                        height: "40px",
                        borderRadius: "35px"
                      }}
                      type="primary"
                      onClick={() => setCoursesLimit(coursesLimit + 3)}
                    >
                      More
                    </Button>
                  </Tooltip>
                )
              )}
            </div>
          ) : (
            <>
              <Tag color="warning">No Courses</Tag>
            </>
          )}
        </span>
      )
    },

    // Joined Date
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "joinedDate",
      render: (text, record) => (
        <Tooltip title="Joined Date">
          <span>{localDay(new Date(text))}</span>
        </Tooltip>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    // Actions = block
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record?.blocked ? (
            <Tooltip title="Unblock this Instructor">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                type="primary"
                shape="circle"
                icon={<CheckCircleOutlined />}
                onClick={() => toggleBlock(record, "Unblock")}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Block this Instructor">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                type="danger"
                shape="circle"
                icon={<StopOutlined />}
                onClick={() => toggleBlock(record, "Block")}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const hitEdit = async (values) => {
    console.log("ID: ", values._id);

    const resp = await axios.put(`/api/admin/user/${values.id}`, values);
    setReFetch((e) => !e);
    if (resp.status === 200) {
      toast.success(`Stundent Updated successfully`);
      setActiveExpRow("0");
      setReFetch((e) => !e);
    } else {
      toast.error(`Error in Editing Course`);
    }
  };

  const toggleBlock = async (record, type) => {
    const resp = await axios.post(`/api/admin/block/${record._id}`);
    setReFetch((e) => !e);
    if (resp.status === 200) {
      toast.success(`User ${type}ed successfully 😁`);
    } else {
      toast.error(`Error ${type}ing User! ❌`);
    }
  };

  const expandInstructors = (record, index, indent, expanded) => {
    form.setFieldsValue({
      id: record._id,
      name: record.name,
      email: record.email
    });

    const newINIT = {
      id: tableData[index]._id,
      name: tableData[index].name,
      email: tableData[index].email
    };

    return (
      <Form
        form={form}
        initialValues={newINIT}
        name={record.name}
        onFinish={hitEdit}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          flexFlow: "nowrap",
          gap: "10px"
        }}
        layout="vertical"
        size="small"
      >
        {/* Slug */}
        <Form.Item name="id"></Form.Item>

        {/* Name */}
        <Form.Item name="name" label="Instructor Name">
          <Input size="small" allowClear placeholder="Type Instructor Name" />
        </Form.Item>

        {/* Email */}
        <Form.Item name="email" label="Instructor email">
          <Input size="small" allowClear placeholder="Type instructor email" />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            alignSelf: "flex-end"
          }}
        >
          <Button htmlType="submit" size="middle" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      <Table
        tableLayout="auto "
        columns={coursesColumns}
        dataSource={modifiedData}
        onChange={handleChange}
        pagination={{
          position: ["bottomCenter"]
        }}
        expandable={{
          expandedRowRender: expandInstructors,

          expandIcon: ({ expanded, onExpand, record }) => {
            return expanded ? (
              <Tooltip title="Cancel Editing">
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  type="danger"
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={(e) => onExpand(record, e)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Edit this course">
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={(e) => onExpand(record, e)}
                />
              </Tooltip>
            );
          },

          rowExpandable: (record) => true,

          expandedRowKeys: activeExpRow,

          onExpand: (expanded, record) => {
            const keys = [];
            if (expanded) {
              keys.push(record._id);
            }
            setActiveExpRow(keys);
          },

          onExpandedRowsChange: (expandedRows) => {
            if (expandedRows.length > 0) {
              confirm(
                "Are you sure you want to edit this course?\nEither OK or Cancel."
              );
            }
          }
        }}
      />
    </>
  );
}
