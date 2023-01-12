import {useReducer} from 'react';
import LocationContext from './location-context';

const defaultLocationState = {};
const locationReducer = (state,action)=>{

}

const LocationProvider = (props) => {
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchLocations = async function () {
    setIsLoading(true);
    setError(null);
    try {
      const jsonRs = await API("/poc1/Location");
      setLocationList(jsonRs?.entry);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <LocationContext.Provider
      value={{
        locationList: locationList,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
export default LocationProvider;
