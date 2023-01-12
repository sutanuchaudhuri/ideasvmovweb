import React, { Component } from 'react';
import './App.css';
import logo from "./logo.svg";
import Auth from "@aws-amplify/auth";
import "./App.css";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import MyProfile from "./components/Profile/MyProfile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Encounter from "./pages/Encounter";
import Organization from "./pages/Organization";
import Practitioner from "./pages/Practitioner";
import Documents from "./pages/Documents";
import Patient from "./pages/Patient";
Amplify.configure(awsExports);
class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
 return (
   <>
     <Router>
       <Navbar />
       <Routes>
         <Route exact path="/" element={<Home />} />
         <Route path="/appointment" element={<Appointment />} />
         <Route exact path="/documents" element={<Documents />} />
         <Route path="/practitioner" element={<Practitioner />} />
         <Route exact path="/encounter" element={<Encounter />} />
         <Route path="/organization" element={<Organization />} />
         <Route path="/patient" element={<Patient />} />
       </Routes>
     </Router>

     {/* <MyProfile user={user} signout={signOut} /> */}
   </>
 );
  }
}

export default withAuthenticator(App);