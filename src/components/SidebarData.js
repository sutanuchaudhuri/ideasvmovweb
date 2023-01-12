import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
    { title: 'Home', icon: <AiIcons.AiFillHome />, path: '/', cName: 'nav-text' },
    { title: 'Patient', icon: <FaIcons.FaDiagnoses />, path: '/patient', cName: 'nav-text' },
    { title: 'Appointment', icon: <AiIcons.AiFillCalendar />, path: '/appointment', cName: 'nav-text' },
    { title: 'Organization', icon: <GoIcons.GoOrganization />, path: '/organization', cName: 'nav-text' },
    { title: 'Practitioner', icon: <GiIcons.GiDoctorFace />, path: '/practitioner', cName: 'nav-text' },
    { title: 'Encounter', icon: <FaIcons.FaStethoscope />, path: '/encounter', cName: 'nav-text' },
    { title: 'Documents', icon: <HiIcons.HiDocumentReport />, path: '/documents', cName: 'nav-text' },
    { title: 'Location', icon: <FaIcons.FaLocationArrow />, path: '/location', cName: 'nav-text' },
     { title: 'Diagnosis', icon: <FaIcons.FaDiagnoses />, path: '/diagnosis', cName: 'nav-text' },
       { title: 'Schedule', icon: <AiIcons.AiFillSchedule />, path: '/schedule', cName: 'nav-text' },
       { title: 'Device', icon: <FaIcons.FaMicroscope />, path: '/device', cName: 'nav-text' },
       { title: 'Users', icon: <FaIcons.FaHospitalUser />, path: '/user', cName: 'nav-text' },
        { title: 'Medicine', icon: <GiIcons.GiMedicinePills />, path: '/medicinereq', cName: 'nav-text' },
         { title: 'Prescription', icon: <FaIcons.FaFilePrescription />, path: '/prescription', cName: 'nav-text' },
           { title: 'Search', icon: <FaIcons.FaSearchPlus />, path: '/search', cName: 'nav-text' },

];
