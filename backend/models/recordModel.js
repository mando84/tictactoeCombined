const mongoose = require("mongoose");
const recordSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    result: {
      type: String,
      required: true,
    },
    character: {
      type: String,
      required: true,
    },
    firstMove: {
      type: Boolean,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);
