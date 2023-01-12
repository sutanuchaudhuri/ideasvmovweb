import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { StrapiAPI } from "../../utilities/StrapiAPI";
let addressDefault = {
  use: "home",
  type: "postal",
  text: "",
  line: ["", ""],
  city: "",
  district: "",
  state: "",
  postalCode: "",
  country: "INDIA", //decide on
  period: null,
};
function AddressForm({ addAddressHandler }) {
  const [addressItem, setAddressItem] = useState({ ...addressDefault });
  const [addressUseItems, setAddressUseItems] = useState([]);
  const [addressTypeItems, setAddressTypeItems] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setStates(await StrapiAPI("states-IN", null, "GET"));
      setAddressTypeItems(await StrapiAPI("address-type", null, "GET"));
      setAddressUseItems(await StrapiAPI("address-use", null, "GET"));
    }
    // const localState = JSON.parse(localStorage.getItem("states-IN"));
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  const addressFieldChangeHandler = (event) => {
    // setIsLoading(true);
    if (event["value"] == "") return;
    let newAddress = { ...addressItem };

    if (event.key.startsWith("addressLine")) {
      if (newAddress.line === undefined) {
        newAddress.line = ["", ""];
      }
      if (event.key.endsWith("1")) {
        console.log("Setting address line 1");
        console.log(newAddress.line);
        newAddress.line[0] = event["value"];
      }
      if (event.key.endsWith("2")) {
        console.log("Setting address line 2");
        console.log(newAddress.line);
        newAddress.line[1] = event["value"];
      }
      setAddressItem(newAddress);
    } else {
      newAddress = { ...newAddress, [event.key]: event["value"] };
      console.log("Address changed " + JSON.stringify(newAddress));
      setAddressItem(newAddress);
    }
  };
  const handleSubmit = (e) => {
    console.log("Handle Submit in address form");
    e.preventDefault();
    console.log(JSON.stringify(addressItem));
    addAddressHandler(addressItem);
    setAddressItem(addressDefault);
    //indicator closing the accordion if needed
  };

  let addressControl = (
    <Form>
      <Row>
        <Col lg={6}>
          <Form.Group controlId="formAddressUse">
            <br />
            <Form.Select
              defaultValue="Choose address use"
              value={addressItem.use ?? ""}
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "use",
                  value: e.target.value,
                });
              }}
            >
              {addressUseItems}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group controlId="formAddressType">
            <br />
            <Form.Select
              defaultValue="Choose addressItem type"
              value={addressItem.type ?? ""}
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "type",
                  value: e.target.value,
                });
              }}
            >
              {addressTypeItems}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formGridAddress1">
            <br />
            <Form.Control
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "addressLine1",
                  value: e.target.value,
                });
              }}
              placeholder="Address Line 1"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          {" "}
          <br />
          <Form.Group controlId="formGridAddress2">
            <Form.Control
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "addressLine2",
                  value: e.target.value,
                });
              }}
              placeholder="Apartment,studio,or floor"
            />
          </Form.Group>
        </Col>
        <Col>
          <br />
          <Button variant="outline-dark">+</Button>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Form.Group as={Col} controlId="formGridCity">
            <br />
            <Form.Control
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "city",
                  value: e.target.value,
                });
              }}
              placeholder="City"
            />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Col} controlId="formGridDistrict">
            <br />
            <Form.Control
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "district",
                  value: e.target.value,
                });
              }}
              placeholder="District"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Form.Group controlId="formGridState">
            <br />
            <Form.Select
              defaultValue="Choose State"
              value={addressItem.state ?? ""}
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "state",
                  value: e.target.value,
                });
              }}
            >
              <option value="">Choose State</option>
              {states}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group controlId="formGridZip">
            <br />
            <Form.Control
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "postalCode",
                  value: e.target.value,
                });
              }}
              placeholder="Postal Code/Zip"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Group controlId="formGridCountry">
            <br />
            <Form.Select
              onChange={(e) => {
                addressFieldChangeHandler({
                  key: "country",
                  value: e.target.value,
                });
              }}
              defaultValue="Choose..."
            >
              <option>Choose a country</option>
              <option value="IN">India</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <br />
      <Row key="save">
        <Col md={10}></Col>
        <Col>
          <Button variant="success" size="lg" onClick={handleSubmit}>
            {" "}
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
  if (isLoading === false) {
    return addressControl;
  } else {
    return <div>Loading ...</div>;
  }
}

export default AddressForm;
