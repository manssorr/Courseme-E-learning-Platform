import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  MinusCircleTwoTone,
  UnlockOutlined
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
  Select
} from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { textTrimer } from "../../../utils/helpers";

export default function TableComponent(props) {
  const { tableData, setReFetch } = props;
  const [form] = Form.useForm();

  const [activeExpRow, setActiveExpRow] = useState();

  const [filteredInfo, setFilteredInfo] = useState({});

  const [tempCatInput, setTempCatInput] = useState("");
  const [tempCat, setTempCat] = useState([]);

  // Remove Rec system courses
  const originalData = tableData.filter(
    (course) => course.instructor !== undefined
  );

  // Add key
  const modifiedData = originalData.map((item) => ({
    ...item,
    key: item._id
  }));

  const categoryFiltersBuilder = useCallback(
    (dataToBuildFrom) => {
      let filters = tempCat?.length > 0 ? [...tempCat] : [];
      dataToBuildFrom.forEach((course) => {
        if (
          course?.category?.length > 0 &&
          !filters.some((filter) => filter.value === course?.category)
        ) {
          filters.unshift({
            text: course.category,
            value: course.category
          });
        }
      });
      return filters;
    },
    [tempCat]
  );

  function localDay(time) {
    console.log(time == "Invalid Date");

    if (time != "Invalid Date") {
      const minutesOffset = time?.getTimezoneOffset();
      const millisecondsOffset = minutesOffset * 60 * 1000;
      const local = new Date(time - millisecondsOffset);
      return local.toISOString().substr(0, 10);
    }

    return "";
  }

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const hitEdit = async (values) => {
    console.table(values);

    const resp = await axios.put(`/api/admin/course/${values.slug}`, values);
    setReFetch((e) => !e);
    if (resp.status === 200) {
      toast.success(`Course Updated successfully`);
      setActiveExpRow("0");
    } else {
      toast.error(`Error in Editing Course`);
    }
  };

  const togglePublish = async (record, type) => {
    const resp = await axios.post(`/api/admin/course/publish/${record.slug}`);
    setReFetch((e) => !e);
    if (resp.status === 200) {
      toast.success(`Course ${type}ed successfully`);
    } else {
      toast.error(`Error ${type}ing Course`);
    }
  };

  const coursesColumns = [
    // Cover
    {
      title: "Cover",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Tooltip title="Course Cover">
          <Avatar size={45} src={text?.Location} />
        </Tooltip>
      ),
      sorter: (a, b) => a.name.length - b.name.length
    },

    // Name
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link href={`/course/${record.slug}`}>
          <Tooltip title="View Course">
            <a>{text}</a>
          </Tooltip>
        </Link>
      ),

      sorter: (a, b) => a.name.length - b.name.length
    },

    // Instructor
    {
      title: "Instructor Name",
      dataIndex: ["instructor", "name"],
      key: "instructor",
      render: (text, record) => (
        // <Link href={`/course/${record.slug}`}>
        // <a>{text}</a>
        // </Link>
        <Tooltip title="Course Owner Name">
          <span>{text}</span>
        </Tooltip>
      ),

      sorter: (a, b) => a.name.length - b.name.length
    },

    // Price
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) =>
        text === 0 ? (
          <Tooltip title="This course is totaly FREE">
            <Tag>Free</Tag>
          </Tooltip>
        ) : (
          <Tooltip title={`This course price is ${text} LE`}>
            <Tag>{text}</Tag>
          </Tooltip>
        ),
      sorter: (a, b) => a.price - b.price
    },

    // Category
    {
      title: "Categories",
      dataIndex: "category",
      key: "category",

      filters: categoryFiltersBuilder(tableData),
      onFilter: (value, record) => record.category === value,
      render: (category) => (
        <span>
          {Array.isArray(category) &&
            category?.map((cat) => (
              <Tag key={category}>{cat.toUpperCase()}</Tag>
            ))}
          <Tag key={category}>{category?.toUpperCase()}</Tag>
        </span>
      )
    },

    // Description
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <span>{textTrimer(description, 100)}</span>
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

    // Actions - Publish/Unpublish
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.published ? (
            <Tooltip title="Unpublish this course">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                type="danger"
                shape="circle"
                icon={<UnlockOutlined />}
                onClick={() => togglePublish(record, "Unpublish")}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Publish this course">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                type="primary"
                shape="circle"
                icon={<LockOutlined />}
                onClick={() => togglePublish(record, "Publish")}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  const handleNewCategory = (e) => {
    e.preventDefault();

    !tempCat.some((cats) => cats.value === tempCatInput) &&
      tempCatInput?.length > 0 &&
      setTempCat([
        ...tempCat,
        {
          value: tempCatInput,
          text: tempCatInput
        }
      ]);

    setTempCatInput("");
  };

  const onCategoryChange = (value) => {
    console.log(value);
    form.setFieldsValue({
      category: value
    });
  };

  const expandCourses = useCallback(
    (record, index, indent, expanded) => {
      console.log("record:", record.slug);

      // form.setFieldsValue({
      //   name: record.name,
      //   description: record.description,
      //   price: record.price,
      //   category: record.category,
      //   slug: record.slug
      // });

      const newINIT = {
        name: tableData[index]?.name,
        description: tableData[index]?.description,
        price: tableData[index]?.price,
        category: [tableData[index]?.category],
        slug: tableData[index]?.slug
      };

      return (
        <Form
          form={form}
          initialValues={newINIT}
          name={record.slug}
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
          <Form.Item hidden={true} name="slug"></Form.Item>

          {/* Name */}
          <Form.Item name="name" label="Course Name">
            <Input size="small" allowClear placeholder="Type Course Name" />
          </Form.Item>

          {/* Price */}
          <Form.Item name="price" label="Price">
            <InputNumber
              size="small"
              placeholder="Name a price"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          {/* Categories */}
          <Form.Item
            name="category"
            style={{
              width: "15%"
            }}
            label="Categories"
          >
            <Select
              showSearch
              size="small"
              placeholder="Please select category"
              optionFilterProp="children"
              onChange={onCategoryChange}
              filterOption={(input, option) => {
                return option.children
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase() > optionB.children.toLowerCase()
                  ? 1
                  : -1
              }
            >
              {categoryFiltersBuilder(tableData).map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
            {/* New Category */}
            <Input.Group
              style={{
                marginTop: "5px",
                width: "104%"
              }}
              compact
            >
              <Input
                style={{
                  width: "70%"
                }}
                placeholder="New Category"
                onChange={(event) => {
                  setTempCatInput(event.target.value);
                }}
                value={tempCatInput}
              />
              <Button
                disabled={
                  tempCat.some((cats) => cats.value === tempCatInput) ||
                  tempCatInput === ""
                }
                onClick={handleNewCategory}
                type="primary"
              >
                Add
              </Button>
            </Input.Group>
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label="Description">
            <Input.TextArea
              size="small"
              allowClear
              placeholder="Write Description"
            />
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
    },

    [
      tableData,
      categoryFiltersBuilder,
      form,
      hitEdit,
      tempCat,
      tempCatInput,
      handleNewCategory,
      onCategoryChange
    ]
  );

  return (
    <>
      <Table
        columns={coursesColumns}
        dataSource={modifiedData}
        onChange={handleChange}
        pagination={{
          position: ["bottomCenter"]
        }}
        expandable={{
          expandedRowRender: expandCourses,

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
