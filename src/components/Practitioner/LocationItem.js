import { useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import classes from "./LocationItem.module.css";
import {
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Col,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { locationActions } from "../../store/location-slice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { API } from "../../utilities/API";
const deleteRequest = async (id) => {
  console.log("Invoking API with delete");
  const data = await API(`/poc1/Location/${id}`, null, "DELETE");
  return data;
};

//    replaceItems (state, action) {
//         state.items=action.payload.items;
//     },
//     modifyItem(state, action) {},
//     addItem(state, action) {},
//     deleteItem(state, action) {},
//     onBeforeItemUpsert(state, action) {},



const LocationItem = ({item}) => {
  const dispatch = useDispatch();



  const deleteItemHandler = async() => {
    await deleteRequest(item?.id);
    dispatch(locationActions.deleteItem(item?.id));
  };

  const updateItemHandler = (locationNew) => {
    dispatch(
      locationActions.modifyItem({
        locationNew,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{item?.name.toUpperCase()}</h3>
        <div className={classes.description}>
          <span className={classes.itemdescription}>{item?.description}</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          <span>
            {" "}
            <Badge
              pill
              bg={
                item?.status?.toUpperCase() == "ACTIVE" ? "danger" : "success"
              }
            >
              {item?.status?.toUpperCase()}
            </Badge>
          </span>
        </div>
        <div className={classes.actions}>
          <Button type="button" block onClick={deleteItemHandler}>
            <TiDeleteOutline color="orange" size={40} />
          </Button>
          <Button type="button" block onClick={updateItemHandler}>
            {" "}
            <AiOutlineEdit color="orange" size={40} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default LocationItem;
