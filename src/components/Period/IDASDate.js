import React, { useState, useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const IDASDate = ({
  dateChangeHandler,
  date = new Date(),
  dateFormat = "YYYY-MM-DD",
}) => {
  const [startDate, setStartDate] = useState(date);

  const onChange = (dates) => {
    //const [start, end] = dates;
    console.log(dates);
    //console.log(end);

    setStartDate(dates);
  };
  return (
    <DatePicker
      placeholderText="Click to select a date"
      selected={new Date()}
      //onChange={onChange}
      //  startDate={startDate}
      //  endDate={endDate}
      //  selectsRange
      //  inline
    />
  );
};

export default IDASDate;
