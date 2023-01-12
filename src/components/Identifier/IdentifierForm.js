import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { StrapiAPI } from "../../utilities/StrapiAPI";
let identifierDefault = {
  use: "usual",
  type:"MR",
  value: "",
};
function IdentifierForm({ addIdentifierHandler}) {
  const [identifierItem, setIdentifierItem] = useState({...identifierDefault});
  const [identifierUseItems, setIdentifierUseItems] = useState([]);
  const [identifierTypeItems, setIdentifierTypeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Update the document title using the browser API
      setIdentifierUseItems(await StrapiAPI("identifier-use", null, "GET"));
      setIdentifierTypeItems(await StrapiAPI("identifier-type", null, "GET"));
    }
    // const localState = JSON.parse(localStorage.getItem("states-IN"));
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const identifierFieldChangeHandler = (event) => {
    // setIsLoading(true);
    if(event["value"]=="") return;
    let newIdentifier = { ...identifierItem, [event.key]: event["value"] };
    console.log("Identifier changed " + JSON.stringify(newIdentifier));
    setIdentifierItem(newIdentifier);

    // setIsLoading(false);
  };
  const handleSubmit = (e) => {
    console.log("Handle Submit in identifier form")
    e.preventDefault();
    console.log(JSON.stringify(identifierItem));
    addIdentifierHandler(identifierItem);
    setIdentifierItem(identifierDefault);
    //indicator closing the accordion if needed
  };

  let identifierControl = (
    <Form>
      <Row key="identifier-use">
        <Col lg={12}>
          <Form.Group controlId="formIdentifierUse">
            <br />
            <Form.Select
              value={identifierItem.use}
              onChange={(e) => {
                identifierFieldChangeHandler({
                  key: "use",
                  value: e.target.value,
                });
              }}
            >
              {identifierUseItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row key="identifier-type">
        <Col lg={12}>
          <Form.Group controlId="formIdentifierType">
            <br />
            <Form.Select
              value={identifierItem.type}
              onChange={(e) => {
                identifierFieldChangeHandler({
                  key: "type",
                  value: e.target.value,
                });
              }}
            >
              {identifierTypeItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row key="identifier-value">
        <Col>
          <Form.Group controlId="identifierValue">
            <br />
            <Form.Control
              value={identifierItem.value}
              onChange={(e) => {
                identifierFieldChangeHandler({
                  key: "value",
                  value: e.target.value,
                });
              }}
              placeholder="Value of the identifier"
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
    return identifierControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default IdentifierForm;
