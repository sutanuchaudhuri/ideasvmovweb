import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TimePicker from "react-bootstrap-time-picker";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";
// import AddNotAvailableTime from "./AddNotAvailableTime";
const AddAvailability = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [weekdays, setWeekdays] = useState([
    { value: "mon", label: "Mon", selected: true },
    { value: "tue", label: "Tue" },
    { value: "wed", label: "Wed" },
    { value: "thu", label: "Thu" },
    { value: "fri", label: "Fri" },
    { value: "sat", label: "Sat" },
    { value: "sun", label: "Sun" },
  ]);

  return (
    <>
      <Card bg="light">
        <Card.Header>Availability </Card.Header>
        <Card.Body>
          <Card.Text >
      
              <Row>
                <Col md={4}>
                  <br />
                  <Form.Check
                    inline
                    label="24 h"
                    name="wholeDay"
                    type="checkbox"
                    id={`wholeDay`}
                  />
                </Col>
                <Col md={4}>
            
                  <Form.Label>Start Time</Form.Label>
                  <TimePicker
                    onChange={(e) => {
                      console.log(e.target.value);
                      setStartTime(e.target.value);
                    }}
                    value={startTime}
                  />
                </Col>
                <Col md={4}>
             
                  <Form.Label>End Time</Form.Label>
                  <TimePicker
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEndTime(e.target.value);
                    }}
                    value={endTime}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Card bg="light">
                    <Card.Body>
                      <Card.Text as="Row">
                        <Col>
                          <Row>
                            <Col>
                              <Form.Check
                                inline
                                label="Sun"
                                name="group1"
                                type="checkbox"
                                id={`sun`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Mon"
                                name="group1"
                                type="checkbox"
                                id={`mon`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Tue"
                                type="checkbox"
                                id={`tues`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Wed"
                                name="group1"
                                type="checkbox"
                                id={`wed`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Thu"
                                name="thurs"
                                type="checkbox"
                                id={`mon`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Fri"
                                type="checkbox"
                                id={`fri`}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                inline
                                label="Sat"
                                type="checkbox"
                                id={`sat`}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
        
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddAvailability;
