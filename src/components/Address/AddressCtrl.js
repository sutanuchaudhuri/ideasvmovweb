import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddressForm from "./Address1Form";
import AddressList from "./AddressList";
function AddressCtrl({
  addressList = [],
  setAddressListHandler,
  entityKeyName = "address",
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("In address ctrl");
  console.log(JSON.stringify(addressList));
  const [showAddPanel, setShowAddPanel] = useState(false);

  const addAddressHandler = (addressIput) => {
    setIsLoading(true);
    let addressListNew = [...addressList, { ...addressIput }];
    let message = { key: entityKeyName, value: addressListNew };
    console.log("Input from Address form " + JSON.stringify(message));
    setAddressListHandler(message);

    setShowAddPanel(false);
        setIsLoading(false);
  };

  let addPanelControl =
    showAddPanel == true ? (
      <Row>
        <Col>
          <AddressForm addAddressHandler={addAddressHandler} />
        </Col>
      </Row>
    ) : (
      <div></div>
    );

  let addressListControl = (
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
          <AddressList addressItems={addressList} />
        </Col>
      </Row>
      {addPanelControl}
    </div>
  );
  if (isLoading === false) {
    return addressListControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default AddressCtrl;
