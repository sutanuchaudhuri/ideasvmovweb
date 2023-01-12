import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PatientList from "./PatientList";
function PatientCtrl({
  entityList = [],
  setIdentifierListHandler,
  entityKeyName = "patient",
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("Patient Ctrl");
  console.log(JSON.stringify(identifierList));
  const [showAddPanel, setShowAddPanel] = useState(false);

//   const addEntityHandler = (entityInput) => {
//     setIsLoading(true);

//     let entityListNew = [...entityList, { ...entityInput }];

//     let message = { key: entityKeyName, value: entityListNew };
//     console.log("Input from entity form " + JSON.stringify(message));
//     setIdentifierListHandler(message);
//     setIsLoading(false);
//     setShowAddPanel(false);
//   };

//   let addPanelControl =
//     showAddPanel == true ? (
//       <Row>
//         <Col>
//           <IdentifierForm addIdentifierHandler={addEntityHandler} />
//         </Col>
//       </Row>
//     ) : (
//       <div></div>
//     );

  let entityListControl = (
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
            + Patient
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <PatientList patientItems={entityList} />
        </Col>
      </Row>
      {/* {addPanelControl} */}
    </div>
  );
  if (isLoading === false) {
    return entityListControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default PatientCtrl;
