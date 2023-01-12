import React, { useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TimePicker from "react-bootstrap-time-picker";
import Form from "react-bootstrap/Form";
import AddAvailability from "./AddAvailability";
import Card from "react-bootstrap/Card";
import AddPeriodItem from "../Period/AddPeriodItem";
const AvailableTime = () => {
  return (
    <>
      <AddAvailability />
      <br />
      <AddAvailability />
      <br />
      <AddAvailability />
      <AddPeriodItem />
    </>
  );
};

export default AvailableTime;
