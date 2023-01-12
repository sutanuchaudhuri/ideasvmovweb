import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { StrapiAPI } from "../../utilities/StrapiAPI";
let contactPointDefault = {
  use: "usual",
  type:"MR",
  value: "",
};
function ContactPointForm({ addContactPointHandler}) {
  const [contactPointItem, setContactPointItem] = useState({...contactPointDefault});
  const [contactPointUseItems, setContactPointUseItems] = useState([]);
  const [contactPointTypeItems, setContactPointTypeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Update the document title using the browser API
      setContactPointUseItems(await StrapiAPI("contact-point-use", null, "GET"));
      setContactPointTypeItems(await StrapiAPI("contact-point-system", null, "GET"));
    }
    // const localState = JSON.parse(localStorage.getItem("states-IN"));
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const contactPointFieldChangeHandler = (event) => {
    // setIsLoading(true);
    if(event["value"]=="") return;
    let newContactPoint = { ...contactPointItem, [event.key]: event["value"] };
    console.log("ContactPoint changed " + JSON.stringify(newContactPoint));
    setContactPointItem(newContactPoint);

    // setIsLoading(false);
  };
  const handleSubmit = (e) => {
    console.log("Handle Submit in contactPoint form")
    e.preventDefault();
    console.log(JSON.stringify(contactPointItem));
    addContactPointHandler(contactPointItem);
    setContactPointItem(contactPointDefault);
    //indicator closing the accordion if needed
  };

  let contactPointControl = (
    <Form>
      <Row key="contactPoint-use">
        <Col lg={12}>
          <Form.Group controlId="formContactPointUse">
            <br />
            <Form.Select
              value={contactPointItem.use}
              onChange={(e) => {
                contactPointFieldChangeHandler({
                  key: "use",
                  value: e.target.value,
                });
              }}
            >
              {contactPointUseItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row key="contactPoint-type">
        <Col lg={12}>
          <Form.Group controlId="formContactPointType">
            <br />
            <Form.Select
              value={contactPointItem.type}
              onChange={(e) => {
                contactPointFieldChangeHandler({
                  key: "type",
                  value: e.target.value,
                });
              }}
            >
              {contactPointTypeItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row key="contactPoint-value">
        <Col>
          <Form.Group controlId="contactPointValue">
            <br />
            <Form.Control
              value={contactPointItem.value}
              onChange={(e) => {
                contactPointFieldChangeHandler({
                  key: "value",
                  value: e.target.value,
                });
              }}
              placeholder="Value of the contactPoint"
            />
          </Form.Group>
        </Col>
      </Row>
     
      <br />
      <Row key="save">
        <Col md={10}></Col>
        <Col>
          <Button variant="success" size="lg" onClick={handleSubmit}>
            {" "}
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
  if (isLoading === false) {
    return contactPointControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default ContactPointForm;
