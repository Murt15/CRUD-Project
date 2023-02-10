import { useState, useEffect } from "react";
import DisplayRecord from "./components/DisplayRecorsd";
import Form from "./components/Form";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
function App() {
  const [data, setdata] = useState();
  useEffect(() => {
    socket.on("record", (data) => {
      setdata(data);
    });
  }, []);

  return (
    <>
      <Form />
      <DisplayRecord items={data} />
    </>
  );
}

export default App;
