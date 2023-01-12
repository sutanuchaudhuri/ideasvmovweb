import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import "./Navbar.css";
import { Auth } from "aws-amplify";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
import {
  Row,
  Col,
  Container,
  Navbar as Nvbar,
  Form,
  NavDropdown,
  Nav
} from "react-bootstrap";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const COGNITO_TOKEN = async () => {
    let loggedUser = await Auth.currentAuthenticatedUser();
    return loggedUser.signInUserSession.idToken.jwtToken;
  };

   const [showProfile, setShowProfile] = useState(false);
   if (showProfile) {
    return (
      <Alert variant="danger" onClose={() => setShowProfile(false)} dismissible>
        <Alert.Heading>Cognito Token</Alert.Heading>
        <p>
    {COGNITO_TOKEN}
        </p>
      </Alert>
    );
  }
  else{
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nvbar fixed="top" sticky="top">
        <Container fluid>
          {/* <Nav flex-grow-1 pe-3> */}
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          {/* </Nav> */}
          <Nvbar.Toggle aria-controls="navbarScroll" />
          <Nvbar.Brand href="#home">
            <Nvbar.Text></Nvbar.Text>
          </Nvbar.Brand>
          <Nvbar.Toggle aria-controls="navbarScroll" />
          <Nvbar.Collapse className="justify-content-end">
            {/* <Nvbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Nvbar.Text> */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nvbar.Collapse>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link
                      onClick={() => {
                        console.log("CLICKED ..  " + item.path);
                      }}
                      to={item.path}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </Nvbar>
    </IconContext.Provider>
  );
          }
}

export default Navbar;
