import { useDispatch } from "react-redux";
import { startEventDelete } from "../../actions/events";

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(startEventDelete());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span> Delete event </span>
    </button>
  );
};

export default DeleteEventFab;
