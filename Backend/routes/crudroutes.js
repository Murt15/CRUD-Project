const express = require("express");

const router = express.Router();
const fileUpload = require("express-fileupload");

const crudController = require("../controllers/crudcontroller");

router.get("/", crudController.getRecords);

router.post(
  "/add-record",
  fileUpload({ createParentPath: true }),
  crudController.addRecord
); //for adding a record

router.delete("/delete-record/:id", crudController.deleteRecord); //for deleting a record

module.exports = router;
