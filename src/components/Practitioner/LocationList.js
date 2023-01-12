
import { Auth } from "aws-amplify";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {useSelector,connect} from 'react-redux';
import LocationItem from "./LocationItem";
import Card from '../UI/Card';
import classes from './Location.module.css';

function LocationList() {
  //Adding redux methods
  // const mapStateToProps = (state) => {
  //   return {
  //     locationItems: state.location.items,
  //   };
  // };
const locationItems = useSelector((state)=>state.location.items); 
    return (
          <ul>
            {locationItems.map((item) => (
              <LocationItem key={item.resource.id} item={item.resource} />
            ))}
          </ul>
      
    );
}
//export default connect(null,null)(LocationList);
export default LocationList;
