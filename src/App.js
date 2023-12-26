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

import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import AppointmentPage from "./pages/AppointmentPage";
import EncounterPage from "./pages/EncounterPage";
import OrganizationPage from "./pages/OrganizationPage";
import PractitionerPage from "./pages/PractitionerPage";
import DocumentsHomePage from "./pages/DocumentsHomePage";
import PatientPage from "./pages/PatientPage";
import LocationPage from "./pages/LocationPage";

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
          <Route exact path="/" element={<HomePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route exact path="/documents" element={<DocumentsHomePage />} />
          <Route path="/practitioner" element={<PractitionerPage />} />
          <Route exact path="/encounter" element={<EncounterPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/patient" element={<PatientPage />} />
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
