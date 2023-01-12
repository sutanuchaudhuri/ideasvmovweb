import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IdentifierForm from "./IdentifierForm";
import IdentifierList from "./IdentifierList";
function IdentifierCtrl({
  identifierList = [],
  setIdentifierListHandler,
  entityKeyName = "identifier",
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("Identifier Ctrl");
  console.log(JSON.stringify(identifierList));
  const [showAddPanel, setShowAddPanel] = useState(false);

  const addIdentifierHandler = (identifierIput) => {
    setIsLoading(true);

    let identifierListNew = [...identifierList, { ...identifierIput }];

    let message = { key: entityKeyName, value: identifierListNew };
    console.log("Input from Identifier form " + JSON.stringify(message));
    setIdentifierListHandler(message);
    setIsLoading(false);
    setShowAddPanel(false);
  };

  let addPanelControl =
    showAddPanel == true ? (
      <Row>
        <Col>
          <IdentifierForm addIdentifierHandler={addIdentifierHandler} />
        </Col>
      </Row>
    ) : (
      <div></div>
    );

  let identifierListControl =
 (
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
              + Identifier
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <IdentifierList identifierItems={identifierList} />
          </Col>
        </Row>
        {addPanelControl}
      </div>
    ) ;
  if (isLoading === false) {
    return identifierListControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default IdentifierCtrl;
