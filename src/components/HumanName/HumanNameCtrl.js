import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import HumanNameForm from "./HumanNameForm";
import HumanNameList from "./HumanNameList";
function HumanNameCtrl({
  humanNameList=[],
  setHumanNameListHandler,
  entityKeyName = "name",
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("HumanNameCtrl");
   console.log(JSON.stringify(humanNameList));
   const [showAddPanel, setShowAddPanel] = useState(false);

    const addHumanNameHandler = (humanNameIput) => {
      setIsLoading(true);
 
      let humanNameVal = humanNameIput;
      let humanNameListNew = [...humanNameList, {...humanNameVal }];
     
let message = { key: entityKeyName, value: humanNameListNew };
   console.log("Input from Human Name form "+ JSON.stringify(message));
      setHumanNameListHandler(message);
      setIsLoading(false);
      setShowAddPanel(false);
    };

    let addPanelControl = showAddPanel == true? (
      <Row>
        <Col>
          <HumanNameForm addHumanNameHandler={addHumanNameHandler} />
        </Col>
      </Row>
    ):(<div></div>);

  let humanNameListControl = (
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
            + Name
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <HumanNameList humanNameItems={humanNameList} />
        </Col>
      </Row>
      {addPanelControl}
    </div>
  );
  if (isLoading === false) {
    return humanNameListControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default HumanNameCtrl;
