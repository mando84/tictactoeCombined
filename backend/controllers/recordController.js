const asyncHandler = require("express-async-handler");
const Record = require("../models/recordModel");
const User = require("../models/userModel");

const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find({ user: req.user.id });
  res.status(200).json(records);
});

const setRecord = asyncHandler(async (req, res) => {
  const record = await Record.create({
    result: req.body.result,
    character: req.body.character,
    firstMove: req.body.firstMove,
    user: req.user.id,
  });

  res.status(200).json(record);
  //res.status(200).json({message: 'hey baby'})
});

module.exports = {
  getRecords,
  setRecord,
};
