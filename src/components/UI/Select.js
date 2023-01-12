import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
const Select = ({defaultValue,selectKey}) => {
      useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
      });
  return (
    <Form.Select size="md" defaultValue={defaultValue}>
      <option>Choose Operation Status</option>
      <option>Karnataka</option>
      <option>Karnataka</option>
      <option>Karnataka</option>
      <option>Karnataka</option>
      <option>Karnataka</option>
    </Form.Select>
  );
};

export default Select;
