import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
function Patient() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const PROXY_API_URL = "/poc1/Patient";
  const API_KEY = "NAXKccFsa667EYPnHyfsW3PKyYzVu3Wp6n6Z0vpM";
  const [cognitoToken, setCognitoToken] = useState("");

  const fetchPatientHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null);
    let headers = {};
    try {
      let loggedUser = await Auth.currentAuthenticatedUser();
      let COGNITO_TOKEN = loggedUser.signInUserSession.idToken.jwtToken;
      setCognitoToken(COGNITO_TOKEN);
      headers = {
        "Content-Type": "application/json",
        method: "GET",
        // Accept: 'application/json',
        mode: "no-cors",
        // 'Access-Control-Allow-Origin': '*',
        // Origin: '',
        // Host: 'drkfqg8y2d.execute-api.us-east-1.amazonaws.com',
        "x-api-key": API_KEY,
        Authorization: COGNITO_TOKEN,
      };
      console.log("Headers");
      console.log(headers);
    } catch (error) {
      setError(error.message);
    }

    try {
      const response = await fetch(PROXY_API_URL, { headers });
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const jsonRs = await response.json();
      console.log("Response JSON");
      console.log(jsonRs);

      setPatients(jsonRs?.entry);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPatientHandler();
  }, [fetchPatientHandler]);
  if (isLoading){
    return (<div>Loading ..</div>)
  }
  else{
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
  
       {/* <Stack direction="horizontal" gap={2}>
      <Form.Control className="me-auto" placeholder="Add your item here..." />
      <Button variant="secondary">Submit</Button>
      <div className="vr" />
      <Button variant="outline-danger">Reset</Button>

      
    </Stack> */}
      <Stack direction="horizontal"  gap={2}>
        <Button as="a" size="xxl" variant="primary">
    Button as link
  </Button>
  <Button as="a" variant="success">
    Button as link
  </Button>
     <ThemeProvider prefixes={{ btn: 'my-btn' }}>
        <Button variant="primary">My Button</Button>
      </ThemeProvider>{' '}
  </Stack>
      {patients.map((patient,index)=> 
        <Row><Col xs={4}>
      {patient?.resource?.name[0]?.family}</Col> 
      <Col>
        {patient?.resource?.name[0]?.given[0]}  </Col> </Row>
    
      
      )}</Container>
 
    
   
  );}
}

export default Patient;
