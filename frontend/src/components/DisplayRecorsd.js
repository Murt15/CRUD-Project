import axios from "axios";
import "./DisplayRecord.css";
const Buffer = require("buffer").Buffer;
const DisplayRecord = (props) => {
  if (!props.items) {
    return <></>;
  }
  //edit handler function
  const editHandler = async (obj) => {
    document.getElementById("title-text").value = obj.title;
    document.getElementById("desc-text").value = obj.description;
    await axios.delete(`http://localhost:4000/delete-record/${obj._id}`);
  };
  //delete handler function
  const deleteHandler = async (id) => {
    axios
      .delete(`http://localhost:4000/delete-record/${id}`)
      .then((resp) => console.log(resp.msg))
      .catch((err) => console.log(err));
  };

  return (
    <div className="record-div">
      {props.items.map((index) => (
        <div key={index._id} className="record-div_div">
          <h1>{index.title}</h1>
          <p>{index.description}</p>
          <img
            className="record-img"
            src={`data:${index.file.data.contentType};base64,${Buffer.from(
              index.file.data.data
            ).toString("base64")}`}
            alt="BackendPhoto"
          />
          <button
            onClick={() => {
              editHandler(index);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteHandler(index._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default DisplayRecord;
