import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import IdentifierItem from "./IdentifierItem";
import classes from "./IdentifierItem.module.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function IdentifierList({
  identifierItems
}) {

  console.log("In identifier list START");
  console.log(JSON.stringify(identifierItems));

 if(identifierItems?.length==0){

   return (
     <Card className={classes.noitem}>
       <Card.Body>
         <Card.Text>No Ids have been added!</Card.Text>
         {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
       </Card.Body>
     </Card>
   );
 }

     
   return <Container>{
      identifierItems.map((identifierItem, index) => {
    return <IdentifierItem index={index} identifierItem={identifierItem} />;

      })
      
    }
      </Container>;
                                                                                                              
 
    
 
}

export default IdentifierList;
