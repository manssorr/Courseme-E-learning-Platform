import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Menu, Button, Select } from "antd";
import { cats } from "../../utils/dummyData";
const { Option } = Select;

function FlitersBar({ courses, allData, setAllData }) {
  const router = useRouter();
  const paramCat = router?.query?.cat;
  const [tempCat, setTempCat] = useState([]);

  // console.log(paramCat);

  const [filters, setFilters] = useState({
    cat: paramCat || null,
    isPaid: "all", // all, paid = true, free = false
    sortDate: "newest", // newest, oldest,
    sortPrice: "priceLowToHigh" // priceLowToHigh, priceHighToLow
  });

  useEffect(() => {
    applyFilters(filters);
  }, []); 

  const categoryFiltersBuilder = (dataToBuildFrom) => {
    let filters = tempCat?.length > 0 ? [...tempCat] : [];
    dataToBuildFrom.forEach((course) => {
      if (
        course?.category?.length > 0 &&
        !filters.some((filter) => filter.value === course?.category)
      ) {
        filters.unshift(course.category);
      }
    });

    const uniqArray = [...new Set(filters)];
    return uniqArray;
  };

  const sorterFunc = (dataToSort, sortBy) => {
    if (sortBy === "newest") {
      return dataToSort.sort((a, b) => {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    } else if (sortBy === "oldest") {
      return dataToSort.sort((a, b) => {
        return (
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );
      });
    } else if (sortBy === "priceLowToHigh") {
      return dataToSort.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy === "priceHighToLow") {
      return dataToSort.sort((a, b) => {
        return b.price - a.price;
      });
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(
      Object.assign({}, filters, {
        [name]: value
      })
    );
  };

  const applyFilters = (filtersX) => {
    const filteredData = courses.filter((course) => {
      const isPriceAll =
        filtersX.isPaid === "all" ? true : course.paid === filtersX.isPaid;

      return (
        (filtersX.cat != undefined ? course.category === filtersX.cat : true) &&
        isPriceAll
      );
    });

    const sortedByDate = sorterFunc(filteredData, filtersX.sortDate);
    const sortedByPrice = sorterFunc(sortedByDate, filtersX.sortPrice);

    setAllData(sortedByPrice);
  };

  return (
    <div
      style={{
        backgroundColor: "#E3EDFF",
        marginBottom: "50px"
      }}
    >
      <div className="container pt-5 pb-5">
        <div className="row">
          {/* Flitered by text */}
          <div className="col-sm-1">
            <span>Filter By</span>
          </div>

          {/* Fliters dropdown */}
          {/* Category */}
          <div className="col">
            <div className="row">
              <Select
                showSearch
                allowClear
                name="category"
                value={filters.cat}
                placeholder="Category"
                className="form-control"
                optionFilterProp="children"
                onChange={(e) => handleFilterChange("cat", e)}
                style={{
                  width: 200
                }}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {categoryFiltersBuilder(courses)?.map((cat, index) => (
                  <Option key={index} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* Is Paid */}
          <div className="col">
            <div className="row">
              <Select
                showSearch
                defaultValue="all"
                value={filters.isPaid}
                name="Is Paid"
                placeholder="Is Paid"
                className="form-control"
                optionFilterProp="children"
                onChange={(e) => handleFilterChange("isPaid", e)}
                style={{
                  width: 200
                }}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
              >
                <Option key="all" value="all">
                  All
                </Option>
                <Option key={true} value={true}>
                  Paid
                </Option>
                <Option key={false} value={false}>
                  Free
                </Option>
              </Select>
            </div>
          </div>

          {/* Sort Date*/}
          <div className="col">
            <div className="row">
              <Select
                showSearch
                defaultValue="newest"
                name="sortDate"
                value={filters.sortDate}
                placeholder="Sort by date"
                className="form-control"
                optionFilterProp="children"
                onChange={(e) => handleFilterChange("sortDate", e)}
                style={{
                  width: 200
                }}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option key="newest" value="newest">
                  Newest
                </Option>
                <Option key="oldest" value="oldest">
                  Oldest
                </Option>
              </Select>
            </div>
          </div>

          {/* Sort Price */}
          <div className="col">
            <div className="row">
              <Select
                showSearch
                defaultValue="LTH"
                value={filters.sortPrice}
                name="sortPrice"
                placeholder="Sort by Price"
                className="form-control"
                optionFilterProp="children"
                onChange={(e) => handleFilterChange("sortPrice", e)}
                style={{
                  width: 200
                }}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
              >
                <Option key="priceHighToLow" value="priceHighToLow">
                  High to low
                </Option>
                <Option key="priceLowToHigh" value="priceLowToHigh">
                  Low to high
                </Option>
              </Select>
            </div>
          </div>

          <Button
            type="primary"
            onClick={() => applyFilters(filters)}
            style={{
              marginLeft: "10px"
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FlitersBar;
