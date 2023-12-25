import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import awsExports from "../aws-exports";


function AdminHomePage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const PROXY_API_URL = "/poc1/Patient";
  const API_KEY = "NAXKccFsa667EYPnHyfsW3PKyYzVu3Wp6n6Z0vpM";
  const [cognitoToken, setCognitoToken] = useState("");

  

  const fetchPatientHandler = useCallback(async function () {
     let loggedUser = await Auth.currentAuthenticatedUser();
     setCognitoToken(loggedUser.signInUserSession.idToken.jwtToken);
    setIsLoading(true);
    setError(null);
    let headers = {};
    

    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPatientHandler();
    
  }, [fetchPatientHandler]);
  if (isLoading) {
    return <div>Loading ..</div>;
  } else {
    console.log(patients);

    return (
      <Container fluid="sm">
        <style type="text/css">
          {`
    .btn-success{
      background-color: purple;
      color: white;
    }
  .my-btn-primary{
    background-color: orange;
      color: white;
  }
    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
        </style>

        <Stack direction="horizontal" gap={2}>
          <Button as="a" size="xxl" variant="primary">
            Admin test button
          </Button>
          <Button as="a" variant="success">
            Admin some button as link
          </Button>
          <ThemeProvider prefixes={{ btn: "my-btn" }}>
            <Button variant="primary">
              Admin Button {awsExports.strapi_readonly_token}
            </Button>
          </ThemeProvider>{" "}
        </Stack>
        {/* {patients.map((patient, index) => (
          <Row>
            <Col xs={4}>{patient?.resource?.name[0]?.family}</Col>
            <Col>{patient?.resource?.name[0]?.given[0]} </Col>{" "}
          </Row>
        ))} */}
        <Row>
          <Col xs={4}> {cognitoToken}</Col>
        </Row>
      </Container>
    );
  }
}

export default AdminHomePage;
