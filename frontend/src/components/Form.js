import { useState } from "react";
import axios from "axios";
import "./DisplayRecord.css";
const Form = () => {
  //initializing useState
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  //Form submit Handler
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    formData.append("description", description);
    formData.append("title", title);
    //making a post request to add data in backend
    await axios.post("http://localhost:4000/add-record", formData);
  };
  return (
    <div>
      <form onSubmit={formSubmitHandler} className="form-div">
        <label>Title</label>
        <input
          type="text"
          id="title-text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          id="desc-text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>Image</label>
        <input
          type="file"
          id="myfiles"
          accept="image/*"
          multiple
          onChange={(e) => {
            setFiles(Array.from(e.target.files));
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
