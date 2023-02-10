//importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//defining the schema defination of records model
const recordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});
//exporting it
module.exports = mongoose.model("record", recordSchema);
