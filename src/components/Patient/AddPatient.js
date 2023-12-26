import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Container ,Card} from "react-bootstrap";
import { API } from "../../utilities/API";
import { StrapiAPI } from "../../utilities/StrapiAPI";
import InputGroup from "react-bootstrap/InputGroup";
import HumanNameCtrl from "../HumanName/HumanNameCtrl";
import IdentifierCtrl from "../Identifier/IdentifierCtrl";
import ContactPointCtrl from "../ContactPoint/ContactPointCtrl";
import AddressCtrl from "../Address/AddressCtrl";
import CardContainer from "../UI/CardContainer";
import Badge from "react-bootstrap/Badge";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";

const AddPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPatient, setNewPatient] = useState({name:[]});
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
    
    }

    fetchData();
  }, []);

  const sendRequest = async (patient) => {
    patient.resourceType = "Patient";
    let url = "Patient";
    let method = "POST";
    console.log("Sending Data....");
    if (patient.id) {
      method = "PUT";
      url = url + "/" + patient.id;
    }
    const data = await API(url, patient, method);
    return data;
  };



  const addPatientHandler = async (event) => {
    event.preventDefault();

    setShow(false);
    const message = {
      ...newPatient,
      resourceType: "Patient",
    };
    console.log(JSON.stringify(message));
    await sendRequest(message);

    setShow(true);
  };
  const alertStatusMessage = show && (
    <Alert variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Patient created</Alert.Heading>
      <p>Patient created</p>
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
      <CardContainer title="Add Patient" buttonContainerVisible={false}>
        <Row>
          <Col>
            <Form onSubmit={addPatientHandler}>
              {alertStatusMessage}
              <Container fluid>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="name-desc"
                >
                  <Row>
                    <Col md={3}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="name-desc">
                            Name({newPatient.name?.length})
                          </Nav.Link>
                          <Nav.Link eventKey="identifier">
                            Identifier({newPatient.identifier?.length ?? 0})
                          </Nav.Link>
                          <Nav.Link eventKey="telecom">
                            Telecom({newPatient.telecom?.length ?? 0})
                          </Nav.Link>
                          <Nav.Link eventKey="address">
                            Address({newPatient.address?.length ?? 0})
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col md={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="name-desc">
                          <Row>
                            <Col>
                              <br />
                              <HumanNameCtrl
                                humanNameList={newPatient.name ?? []}
                                setHumanNameListHandler={(names) => {
                                  console.log(
                                    "Human name list  update received"
                                  );
                                  console.log(JSON.stringify(names["value"]));
                                  setNewPatient({
                                    ...newPatient,
                                    name: names["value"],
                                  });
                                  console.log(JSON.stringify(newPatient));
                                }}
                              />
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="identifier">
                          <Row>
                            <Col>
                              <br />

                              <IdentifierCtrl
                                identifierList={newPatient.identifier ?? []}
                                setIdentifierListHandler={(identifiers) => {
                                  console.log(
                                    "Identifier list  update received"
                                  );
                                  console.log(
                                    JSON.stringify(identifiers["value"])
                                  );
                                  setNewPatient({
                                    ...newPatient,
                                    identifier: identifiers["value"],
                                  });
                                  console.log(JSON.stringify(newPatient));
                                }}
                              />
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="telecom">
                          <Row>
                            <Col>
                              <br />

                              <ContactPointCtrl
                                contactPointList={newPatient.telecom ?? []}
                                setContactPointListHandler={(contactPoints) => {
                                  console.log(
                                    "Contact point list  update received"
                                  );
                                  console.log(
                                    JSON.stringify(contactPoints["value"])
                                  );
                                  setNewPatient({
                                    ...newPatient,
                                    telecom: contactPoints["value"],
                                  });
                                  console.log(JSON.stringify(newPatient));
                                }}
                              />
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="address">
                          <Row>
                            <Col>
                              <br />

                              <AddressCtrl
                                addressList={newPatient.address ?? []}
                                setAddressListHandler={(addresses) => {
                                  console.log("Address list  update received");
                                  console.log(
                                    JSON.stringify(addresses["value"])
                                  );
                                  setNewPatient({
                                    ...newPatient,
                                    address: addresses["value"],
                                  });
                                  console.log(JSON.stringify(newPatient));
                                }}
                              />
                            </Col>
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Container>
            </Form>
          </Col>
        </Row>
        <Row>
       
          <Col sm="12">
            {" "}
            <Button
              style={{ maxWidth: "100%",width:'1200px' }}
              type="submit"
              variant="success"
              onClick={addPatientHandler}
              size="lg"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </CardContainer>
    </>
  );
};
export default AddPatient;
