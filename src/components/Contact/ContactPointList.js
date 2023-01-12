import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import ContactPointItem from "./ContactPointItem";
import classes from "./ContactPointItem.module.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function ContactPointList({
  contactPointItems
}) {

  console.log("In contactPoint list START");
  console.log(JSON.stringify(contactPointItems));

 if(contactPointItems?.length==0){

   return (
     <Card className={classes.noitem}>
       <Card.Body>
         <Card.Text>No telecom  have been added!</Card.Text>
         {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
       </Card.Body>
     </Card>
   );
 }

     
   return <Container>{
      contactPointItems.map((contactPointItem, index) => {
    return <ContactPointItem index={index} contactPointItem={contactPointItem} />;

      })
      
    }
      </Container>;
                                                                                                              
 
    
 
}

export default ContactPointList;
