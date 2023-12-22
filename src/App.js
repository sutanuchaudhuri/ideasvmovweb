import logo from "./logo.svg";
import Auth from "@aws-amplify/auth";
import "./App.css";
// import { Amplify } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
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
import LocationPage from "./pages/LocationPage";
import Container from "react-bootstrap/Container";
import AddLocationPage from "./pages/AddLocationPage";
import AddPatientPage from "./pages/AddPatientPage";
import AdminHomePage from "./pages/AdminHomePage";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user);
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
          <Route path="/location" element={<LocationPage />} />
          <Route path="/addlocation" element={<AddLocationPage />} />
          <Route path="/addPatient" element={<AddPatientPage />} />
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </Router>

      {/* <MyProfile user={user} signout={signOut} /> */}
    </>
  );
}

export default withAuthenticator(App);
