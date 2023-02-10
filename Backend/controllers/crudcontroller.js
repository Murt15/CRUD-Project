//Importing Record Model
const Record = require("../models/record");

//Importing and starting socket server on port 5000
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

exports.getRecords = async (req, res) => {
  //setting up io on connection for emitting the existing record
  io.on("connection", (socket) => {
    // console.log(socket.id);
    console.log("A user has connected");

    Record.find({}, (error, records) => {
      //finding all the existing records from the record model and submitting it to database
      if (error) {
        console.error(error);
      } else {
        io.emit("record", records);
      }
    });
  });
};
//function for adding a record
exports.addRecord = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const files = req.files;

  try {
    //iterating from the recieved object
    Object.keys(files).forEach((key) => {
      const newRecord = new Record({
        title: title,
        description: description,
        file: {
          data: files[key].data,
          contentType: files[key].mimetype,
        },
      });
      //saving the object to database
      newRecord.save().then((resp) => {
        res.json({ res: resp, message: "Files  uploaded successfully" });
        Record.find({}, (error, records) => {
          if (error) {
            console.error(error);
          } else {
            io.emit("record", records);
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
//function for deleting the record
exports.deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    await Record.findByIdAndRemove(id);
    Record.find({}, (error, records) => {
      if (error) {
        console.error(error);
      } else {
        io.emit("record", records);
      }
    });
    res.json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
