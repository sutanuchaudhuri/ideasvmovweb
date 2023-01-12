import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./PatientItem.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const PatientItem = ({ item, index, handleToggle }) => {
  console.log("In human Item");
  return (
    <Card className={classes.item}>
      <Card.Body>
        <Card.Title>
          {/* {(humanName.given ?? []).join(" ") +"   " +humanName.family} */}
        </Card.Title>
        <Card.Text>
          {" "}
          <Row>
            <Col className={classes.indexwrap} sm={1}>
              {" "}
              <strong className={classes.index}>{index + 1}</strong>
            </Col>
            <Col sm={10}>
              {" "}
              <Row className={classes.item}>
                <Col> {item.name?.text}</Col>
                <Col> {item.active??true==true?"Active":"Inactive"}</Col>
              </Row>
            </Col>
          </Row>
        </Card.Text>
        {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
      </Card.Body>
    </Card>
  );
};

export default PatientItem;
