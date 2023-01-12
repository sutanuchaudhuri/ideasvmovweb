
import React, { useState, useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import IDASDate from "./IDASDate";

const AddPeriodItem = ({
  // startDateChangeHandler,
  // endDateChangeHandler
}) => {

  const [startDate, setStartDate] = useState("1990-06-05");
  const [endDate, setEndDate] = useState("1990-06-05");
  const handleStartDateChange = (newDate) => {
    console.log("newDate", newDate);
    setStartDate(newDate);
   // startDateChangeHandler(newDate);
  };
    const handleEndDateChange = (newDate) => {
      console.log("newDate", newDate);
      setEndDate(newDate);
      //endDateChangeHandler(newDate);
    };
  return (
    <>
    <br/>
      <Row>
        <Col>
          <IDASDate
            date={startDate}
            dateChangeHandler={handleStartDateChange}
          />
        </Col>
     
        <Col>
          <IDASDate date={endDate} dateChangeHandler={handleEndDateChange} />
        </Col>
      </Row>
    </>
  );
};

export default AddPeriodItem;