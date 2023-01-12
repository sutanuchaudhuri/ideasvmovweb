import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import { API } from "../../utilities/API";
import InputGroup from "react-bootstrap/InputGroup";
import AddressForm from "../Address/AddressForm";
import Badge from "react-bootstrap/Badge";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import AvailableTime from "../Availability/AvailableTime";
import Alert from "react-bootstrap/Alert";

const AddPractitioner = () => {
  const [enteredLocationName, setEnteredLocationName] = useState("");
  const [enteredLocationDescription, setEnteredLocationDescription] =
    useState("");
     const [show, setShow] = useState(false);
  const [isLocationNameValid, setIsLocationNameValid] = useState(true);
  const [locationNameValidationMessage, setLocationNameValidationMessage] =
    useState("Required");
  const locationNameChangeHandler = (event) => {
    setEnteredLocationName(event.target.value);
  };
  const locationDescriptionChangeHandler = (event) => {
    setEnteredLocationDescription(event.target.value);
  };



    const sendRequest = async (location) => {
   
        location.resourceType = "Location";
        let url = "/poc1/Location";
        let method = "POST";
        console.log("Sending Data....");
        if (location.id) {
          method = "PUT";
          url = url + "/" + location.id;
        }
        const data = await API(url,location, method);
        return data;
   
    };



  const searchLocationNameHandler = async function (event) {
    try {
      if (event.target.value.trim() === "") {
        setIsLocationNameValid(false);
        setLocationNameValidationMessage("Location name is mandatory");
        return;
      }

      const jsonRs = await API("/poc1/Location?name=" + event.target.value);
      if (jsonRs?.entry.length > 0) {
        console.log(jsonRs?.entry);

        let filtered = jsonRs?.entry.filter(
          (x) =>
            x.resource?.name?.toUpperCase() == event.target.value.toUpperCase()
        );
        console.log("filtered");
        console.log(filtered);
        if (filtered.length > 0) {
          console.log("Location already exists");
          setIsLocationNameValid(false);
          setLocationNameValidationMessage("Location already exists");
        } else {
          setIsLocationNameValid(true);
        }
      } else {
        setIsLocationNameValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLocationHandler = async(event) => {
    event.preventDefault();
    console.log(enteredLocationName, enteredLocationDescription);
    if (
      enteredLocationName?.trim().length === 0 
      // ||
      // enteredLocationDescription?.trim().length === 0
    ) {
      return;
    }
     setShow(false);
    await sendRequest({
      resourceType: "Location",
      name: enteredLocationName.trim(),
      description: enteredLocationDescription.trim(),
    });
    setEnteredLocationDescription("");
    setEnteredLocationName("");
    setShow(true);
  };
const alertStatusMessage=
       show  &&
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Location created</Alert.Heading>
          <p>
            Location created 
          </p>
        </Alert>;
        

  return (
    <>
      <style type="text/css">
        {`
.roomfac {
    display: flex;
    width: 100%;
    max-width: 60%;
    margin: 0 auto;
    justify-content: center;
}  
.alreadyExists{
background-color: hotpink;
}
.validated{
    background-color: white;
}
`}
      </style>

      <Form onSubmit={addLocationHandler}>
        {alertStatusMessage}
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="name-desc">
            <Row>
              <Col md={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="name-desc">Name,Id,Alias</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="gps-addr">Address</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="contact">Contact</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="hours-op">Operation Hours</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="name-desc">
                    <Row>
                      <Col lg={8}>
                        <Form.Group controlId="formLocation">
                          <br />
                          <InputGroup hasValidation>
                            <Form.Control
                              onChange={locationNameChangeHandler}
                              onBlur={searchLocationNameHandler}
                              value={enteredLocationName}
                              isInvalid={!isLocationNameValid}
                              type="text"
                              // className={
                              //   isLocationNameValid === true ? "validated" : "alreadyExists"
                              // }
                              id="name"
                              required
                              placeholder="Location name"
                              aria-describedby="name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {locationNameValidationMessage}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group controlId="formGridPhysicalType">
                          <br />
                          <Form.Select size="md" defaultValue="Mode">
                            <option>Choose Location Mode</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="formAlias">
                          <br />

                          <Form.Control type="text" placeholder="Alias" />
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                        <br />
                        <h3>
                          <Badge bg="dark">Primary</Badge>{" "}
                        </h3>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="formDescription">
                          <br />
                          <InputGroup hasValidation>
                            <Form.Control
                              onChange={locationDescriptionChangeHandler}
                              value={enteredLocationDescription}
                              as="textarea"
                              multiline
                              required
                              rows={10}
                              id="description"
                              aria-describedby="description"
                              placeholder="Description of location"
                            />
                            <Form.Control.Feedback type="invalid">
                              Description required
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="ServiceDeliveryLocationRoleType">
                          <br />
                          <Form.Select size="md" defaultValue="">
                            <option>
                              Choose Service Delivery Location Type
                            </option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <Form.Group controlId="formGridOperationStatus">
                          <br />
                          <Form.Select
                            size="md"
                            defaultValue="Operation Status"
                          >
                            <option>Choose Operation Status</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group controlId="formGridStatus">
                          <br />
                          <Form.Select size="md" defaultValue="Status">
                            <option>Choose Status</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group controlId="formGridPhysicalType">
                          <br />
                          <Form.Select size="md" defaultValue="Status">
                            <option>Choose Location Physical Type</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                            <option>Karnataka</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="gps-addr">
                    <Row>
                      <Col>
                        <br />
                        <AddressForm />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group controlId="formLatitude">
                          <br />

                          <Form.Control type="text" placeholder="Latitude" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="formLongitude">
                          <br />

                          <Form.Control type="text" placeholder="Longitude" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="formAltitude">
                          <br />

                          <Form.Control type="text" placeholder="Altitude" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="contact"></Tab.Pane>
                  <Tab.Pane eventKey="hours-op">
                    <AvailableTime />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
            <Row>
              <Col md={3}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={9}>
                {" "}
                <Button type="submit" onClick={addLocationHandler} size="lg">
                  Submit
                </Button>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Form>
      {/* </Card.Body>
        </Card>
      </Container> */}
    </>
  );
};
export default AddPractitioner;
