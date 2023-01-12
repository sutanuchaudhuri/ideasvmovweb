import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./ContactPointItem.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const ContactPointItem = ({ contactPointItem,index, handleToggle }) => {

console.log("In contactPoint Item");
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
                <Col> {contactPointItem.use}</Col>
                <Col> {contactPointItem.type}</Col>
                <Col> {contactPointItem.value}</Col>
                <Col> {contactPointItem.rank}</Col>
              </Row>
            </Col>
          </Row>
        </Card.Text>
        {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
      </Card.Body>
    </Card>
  );
};

export default ContactPointItem;
