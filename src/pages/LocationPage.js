import AddLocation from "../components/Location/AddLocation";
import LocationList from "../components/Location/LocationList";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../utilities/API";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { fetchLocationData } from "../store/location-actions";
import { Row, Col, Container } from "react-bootstrap";
import CardContainer from "../components/UI/CardContainer";
import {Link} from 'react-router-dom';

function LocationPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocationData());
  }, [dispatch]);
  const isLoading = false;
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Spinner size="lg" animation="grow" />
      </div>
    );
  } else {
    return (
      <CardContainer title="Location" buttonContainerVisible={false}>
        <Button variant="outline-secondary" size="md">
          <Link to="/addlocation">Create Location</Link>
        </Button>
        <div
          style={{
              flex: 1,
           overflow: 'scroll'
          }}
        >
          <LocationList />
        </div>
      </CardContainer>
    );
  }

}

export default LocationPage;
