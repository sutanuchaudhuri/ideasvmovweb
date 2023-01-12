
  import Button from "react-bootstrap/Button";
  import Stack from "react-bootstrap/Stack";
  import ThemeProvider from "react-bootstrap/ThemeProvider";
  import Container from "react-bootstrap/Container";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import Table from "react-bootstrap/Table";
  import Card from "./Card";
  import classes from "./CardContainer.module.css";    
   const CardContainer = (props) => {   
let buttonContainer = (
  <div className="d-grid gap-2">
    <Button variant="success" size="lg">
      Save
    </Button>
  </div>
);
    if (props.buttonContainerVisible===false)
    {
      buttonContainer=<div></div>
    }
    

     
    return (
      <Container fluid="sm">
        <Card className={classes.cardContainer}>
          <Table>
            <Row>
              <Col md={10}>
                {" "}
                <h2 className={classes.title}>{props.title} </h2>
              </Col>
              
              <Col md={2}>
                {buttonContainer}
               
              </Col>
            </Row>
          </Table>
          {props.children}
        </Card>
      </Container>
    );
      
    }
      export default CardContainer;