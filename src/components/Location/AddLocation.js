import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import { API } from "../../utilities/API";
import { StrapiAPI } from "../../utilities/StrapiAPI";
import InputGroup from "react-bootstrap/InputGroup";
import AddressForm from "../Address/AddressForm";
import Badge from "react-bootstrap/Badge";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import AvailableTime from "../Availability/AvailableTime";
import Alert from "react-bootstrap/Alert";

const AddLocation = () => {
let addressDefault = {
  use: "home",
  type: "postal",
  text: "",
  line: ["", ""],
  city: "",
  district: "",
  state: "",
  postalCode: "",
  country: "INDIA", //decide on
  period: null,
};

  const [enteredLocationName, setEnteredLocationName] = useState("");
  const [enteredLocationDescription, setEnteredLocationDescription] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newLocation, setNewLocation] = useState({ address: addressDefault });
  const [show, setShow] = useState(false);
  const [isLocationNameValid, setIsLocationNameValid] = useState(true);
  const [locationNameValidationMessage, setLocationNameValidationMessage] =
    useState("Required");
  // const [locationModes,setLocationModes]=useState([]);
  const [locationOperationStatus, setLocationOperationStatus] = useState([]);
  const [selectedLocationOperationStatus, setSelectedLocationOperationStatus] =
    useState("DEFAULT");
  const [locationModes, setLocationModes] = useState([]);
  const [locationStatus, setLocationStatus] = useState([]);
  const [locationPhysicalType, setLocationPhysicalType] = useState([]);
  const [
    selectedServiceDeliveryLocationRoleType,
    setSelectedServiceDeliveryLocationRoleType,
  ] = useState("DEFAULT");

  const locationNameChangeHandler = (event) => {
    setEnteredLocationName(event.target.value);
  };
  const locationDescriptionChangeHandler = (event) => {
    setEnteredLocationDescription(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      // Update the document title using the browser API
      setLocationModes(await StrapiAPI("location-mode", null, "GET"));
      setLocationStatus(await StrapiAPI("location-status", null, "GET"));
      setLocationOperationStatus(await StrapiAPI("bed-status", null, "GET"));
      setLocationPhysicalType(
        await StrapiAPI("location-physical-type", null, "GET")
      );
    }
    
    

    fetchData();
  }, []);

  const sendRequest = async (location) => {
    location.resourceType = "Location";
    let baseurl="https://h6i9k20b08.execute-api.us-east-1.amazonaws.com/";
    let url = baseurl+"/dev00/tenant/tenant1/Location";
    let method = "POST";
    console.log("Sending Data....");
    if (location.id) {
      method = "PUT";
      url = url + "/" + location.id;
    }
    const data = await API(url, location, method);
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

  const addLocationHandler = async (event) => {
    event.preventDefault();

    console.log(
      enteredLocationName,
      enteredLocationDescription,
      selectedServiceDeliveryLocationRoleType
    );
    if (enteredLocationName?.trim().length === 0) {
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
  const alertStatusMessage = show && (
    <Alert variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Location created</Alert.Heading>
      <p>Location created</p>
    </Alert>
  );

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
        <Container fluid>
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
                            {locationModes}
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
                          <Form.Select
                            value={selectedServiceDeliveryLocationRoleType}
                            onChange={(x) => {
                              setSelectedServiceDeliveryLocationRoleType(x);
                            }}
                            size="md"
                            defaultValue=""
                          >
                            <option value={"DEFAULT"}>
                              Choose Service Delivery Location Type
                            </option>
                            <option value="HOSP">Hospital</option>
                            <option value="OPTC">Optometry Clinic</option>
                            <option value="ER">Emergency Room</option>
                            <option value="HLAB">Hospital Laboratory</option>
                            <option value="INLAB">Inpatient Lab</option>
                            <option value="OUTLAB">Outpatient Lab</option>
                            <option value="ICU">Intensive Care Unit</option>
                            <option value="INPHARM">Inpatient Pharmacy</option>
                            <option value="MBL">Medical Lab</option>
                            <option value="HUSCS">
                              Specimen Collection Site
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="formGridOperationStatus">
                          <br />
                          <Form.Select
                            size="md"
                            value={selectedLocationOperationStatus}
                            onChange={(x) => {
                              setSelectedLocationOperationStatus(x);
                            }}
                            defaultValue="Operation Status"
                          >
                            <option value="DEFAULT">
                              Choose Operation Status
                            </option>
                            {locationOperationStatus}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="formGridStatus">
                          <br />
                          <Form.Select size="md">
                            <option>Choose Status</option>
                            {locationStatus}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="formGridPhysicalType">
                          <br />
                          <Form.Select
                            id="formGridPhysicalType"
                            size="md"
                            defaultValue="Status"
                          >
                            <option>Choose Location Physical Type</option>
                            {locationPhysicalType}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <br />
                        <Container style={{ maxWidth: "100%" }} fluid>
                          <Button
                            style={{ maxWidth: "100%" }}
                            type="submit"
                            onClick={addLocationHandler}
                            size="lg"
                          >
                            Submit
                          </Button>
                        </Container>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="gps-addr">
                    <Row>
                      <Col>
                        <br />
                        <AddressForm
                          addressItem={newLocation.address}
                          setAddressHandler={(newAddress) => {
                            console.log("Address update received");
                            console.log(newAddress["value"]);
                            setNewLocation({
                              ...newLocation,
                              address: newAddress["value"],
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formLatitude">
                          <br />

                          <Form.Control type="text" placeholder="Latitude" />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="formLongitude">
                          <br />

                          <Form.Control type="text" placeholder="Longitude" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
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
          </Tab.Container>
        </Container>
      </Form>
   
    </>
  );
};
export default AddLocation;
