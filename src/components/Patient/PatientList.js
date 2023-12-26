import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import PatientItem from "./PatientItem";
import classes from "./PatientItem.module.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function PatientList({ patientItems }) {

  console.log(JSON.stringify(patientItems));

  if (patientItems?.length == 0) {
    return (
      <Card className={classes.noitem}>
        <Card.Body>
          <Card.Text>No Patients have been added!</Card.Text>
          {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Container>
      {patientItems.map((patientItem, index) => {
        return <PatientItem index={index} item={patientItem} />;
      })}
    </Container>
  );
}

export default PatientList;
