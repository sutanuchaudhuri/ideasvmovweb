import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import HumanNameItem from "./HumanNameItem";
import classes from "./HumanNameItem.module.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function HumanNameList({
  humanNameItems
}) {

  console.log("In human name list START");
  console.log(JSON.stringify(humanNameItems));

 if(humanNameItems?.length==0){

   return (
     <Card className={classes.noitem}>
       <Card.Body>
         <Card.Text>No names to display</Card.Text>
         {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
       </Card.Body>
     </Card>
   );
 }

     
   return <Container>{
      humanNameItems.map((humanName, index) => {
    return <HumanNameItem index={index} humanName={humanName} />;

      })
      
    }
      </Container>;
                                                                                                              
 
    
 
}

export default HumanNameList;
