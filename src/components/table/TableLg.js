import React from "react";
import PropTypes from "prop-types";

const Table = ({ tableData, headingColumns, title, breakOn = "medium" }) => {
  let tableClass = "table-container-lg__table";

  if (breakOn === "small") {
    tableClass += " table-container-lg__table--break-sm";
  } else if (breakOn === "medium") {
    tableClass += " table-container-lg__table--break-md";
  } else if (breakOn === "large") {
    tableClass += " table-container-lg__table--break-lg";
  }

  var moneystyle = {};

  const data = tableData.map((row, index) => {
    let rowData = [];
    let i = 0;

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        value: row[key],
      });
      i++;
    }

    function setInfo(info, head) {
      if (head === "Type") {
        switch (info) {
          case "Deposit":
            moneystyle = { color: "green" };
            break;
          case "Withdraw":
            moneystyle = { color: "red" };
            break;
          case "Transfer":
            moneystyle = { color: "green" };
            break;
          default:
          // code block
        }
      }

      if (head === "Amount") {
        return (
          <div style={moneystyle}>
            {info.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        );
      } else {
        return info;
      }
    }

    return (
      <tr key={index}>
        {rowData.map((data, index) => (
          <td key={index} data-heading={data.key}>
            {setInfo(data.value, data.key)}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <div className="table-container-lg">
      <div className="table-container-lg__title">
        <h2>{title}</h2>
      </div>
      <table className={tableClass}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
