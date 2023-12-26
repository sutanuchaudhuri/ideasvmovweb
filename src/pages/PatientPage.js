import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import CardContainer from "../components/UI/CardContainer";
import {Link} from 'react-router-dom';
import AddPatient from "../components/Patient/AddPatient";
// import PatientList from "../components/Patient/PatientList";



function PatientPage() {

    return (
    <CardContainer title="Patient" buttonContainerVisible={false}>

     <Button variant="outline-secondary" size="md">
          <Link to="/addpatient">Create Patient</Link>
        </Button>
    </CardContainer>
    );
     
    
  
}

export default PatientPage;
