import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddressItem from "./AddressItem";
import classes from "./AddressItem.module.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function AddressList({
  addressItems
}) {

  console.log("In address list START");
  console.log(JSON.stringify(addressItems));

 if(addressItems?.length==0){

   return (
     <Card className={classes.noitem}>
       <Card.Body>
         <Card.Text>No address  have been added!</Card.Text>
         {/* <Card.Subtitle className="mb-2">Primary</Card.Subtitle> */}
       </Card.Body>
     </Card>
   );
 }

     
   return <Container>{
      addressItems.map((addressItem, index) => {
    return <AddressItem index={index} addressItem={addressItem} />;

      })
      
    }
      </Container>;
                                                                                                              
 
    
 
}

export default AddressList;
