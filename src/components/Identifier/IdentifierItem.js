import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./IdentifierItem.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const IdentifierItem = ({ identifierItem,index, handleToggle }) => {

console.log("In identifier Item");
  return (
    <Row className={classes.item}>
      <Col className={classes.indexwrap} sm={1}>
        {" "}
        <strong className={classes.index}>{index + 1}</strong>
      </Col>
      <Col sm={10}>
        {" "}
        <Row className={classes.item}>
          <Col> {identifierItem.use.toUpperCase()}</Col>
          <Col>
            {" "}
            <strong className={classes.identifierValue}>
              {identifierItem.value.toUpperCase()}
            </strong>
            <strong className={classes.identifierType}>
              {identifierItem.type}
            </strong>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default IdentifierItem;
