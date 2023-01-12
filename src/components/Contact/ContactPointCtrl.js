import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContactPointForm from "./ContactPointForm";
import ContactPointList from "./ContactPointList";
function ContactPointCtrl({
  contactPointList = [],
  setContactPointListHandler,
  entityKeyName = "telecom",
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("ContactPoint Ctrl");
  console.log(JSON.stringify(contactPointList));
  const [showAddPanel, setShowAddPanel] = useState(false);

  const addContactPointHandler = (contactPointIput) => {
    setIsLoading(true);
    let contactPointListNew = [...contactPointList, { ...contactPointIput }];
    let message = { key: entityKeyName, value: contactPointListNew };
    console.log("Input from ContactPoint form " + JSON.stringify(message));
    setContactPointListHandler(message);

    setShowAddPanel(false);
        setIsLoading(false);
  };

  let addPanelControl =
    showAddPanel == true ? (
      <Row>
        <Col>
          <ContactPointForm addContactPointHandler={addContactPointHandler} />
        </Col>
      </Row>
    ) : (
      <div></div>
    );

  let contactPointListControl = (
    <div>
      <Row>
        <Col xs={9}></Col>

        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setShowAddPanel(true);
            }}
          >
            + ADD
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ContactPointList contactPointItems={contactPointList} />
        </Col>
      </Row>
      {addPanelControl}
    </div>
  );
  if (isLoading === false) {
    return contactPointListControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default ContactPointCtrl;
