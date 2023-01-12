import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import { StrapiAPI } from "../../utilities/StrapiAPI";
let humanNameDefault = {
  use: "official",
  text: "",
};
function HumanNameForm({ addHumanNameHandler, entityKeyName = "" }) {
  const [humanNameItem, setHumanNameItem] = useState({...humanNameDefault});

  const [humanNameUseItems, setHumanNameUseItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Update the document title using the browser API
      setHumanNameUseItems(await StrapiAPI("name-use", null, "GET"));
    }
    // const localState = JSON.parse(localStorage.getItem("states-IN"));
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const humanNameFieldChangeHandler = (event) => {
    // setIsLoading(true);
    if(event["value"]=="") return;
    let newHumanName = { ...humanNameItem, [event.key]: event["value"] };
    console.log("Human name changed " + JSON.stringify(newHumanName));
    setHumanNameItem(
      newHumanName
    );

    // setIsLoading(false);
  };
  const handleSubmit = (e) => {
    console.log("handle Submit in human name form")
    e.preventDefault();
    addHumanNameHandler(humanNameItem);
    setHumanNameItem(humanNameDefault);
    //indicator closing the accordion if needed
  };

  let humanNameControl = (
    <Form>
      <Row key="name-use">
        <Col lg={12}>
          <Form.Group controlId="formHumanNameUse">
            <br />
            <Form.Select
              value={humanNameItem.use}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "use",
                  value: e.target.value,
                });
              }}
            >
              {humanNameUseItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row key="name-text">
        <Col>
          <Form.Group controlId="humanNameText">
            <br />
            <Form.Control
              value={humanNameItem.text}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "text",
                  value: e.target.value,
                });
              }}
              placeholder="Full Text"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row key="name-family">
        <Col md={12}>
          {" "}
          <br />
          <Form.Group controlId="humanNameFamily">
            <Form.Control
              value={humanNameItem.family}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "family",
                  value: e.target.value,
                });
              }}
              placeholder="Family name or surname"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row key="name-given">
        <Col lg={12}>
          <Form.Group as={Col} controlId="humanNameGiven">
            <br />
            <Form.Control
              value={(humanNameItem.given ?? []).join(" ")}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "given",
                  value: e.target.value?.split(" "),
                });
              }}
              placeholder="Given Name"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row key="name-suffix">
        <Col lg={6}>
          <Form.Group as={Col} controlId="humaNameSuffix">
            <br />
            <Form.Control
              value={(humanNameItem.suffix ?? []).join(" ")}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "suffix",
                  value: e.target.value?.split(" "),
                });
              }}
              placeholder="Suffix"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Col} controlId="humaNamePrefix">
            <br />
            <Form.Control
              value={(humanNameItem.prefix ?? []).join(" ")}
              onChange={(e) => {
                humanNameFieldChangeHandler({
                  key: "prefix",
                  value: e.target.value?.split(" "),
                });
              }}
              placeholder="Prefix"
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Row key="save">
        <Col md={10}></Col>
        <Col>
          <Button variant="success" size="lg" onClick={handleSubmit}> Save</Button>
        </Col>
      </Row>
    </Form>
  );
  if (isLoading === false) {
    return humanNameControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default HumanNameForm;
