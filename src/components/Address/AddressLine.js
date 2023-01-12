import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function AdddressLine({lineNum}) {
  return (
    <>
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Line {lineNum}</Form.Label>
        <Form.Control placeholder="Line " />
      </Form.Group>
    </>
  );
}
 export default AdddressLine;