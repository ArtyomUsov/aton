const { model, Schema } = require("mongoose");

const schema = new Schema({
  accountNumber: {
    type: Schema.Types.Number,
    required: true,
    unique: true,
    min: 20,
    max: 20,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 20,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 30,
  },
  surname: {
    type: Schema.Types.String,
    required: true,
    min: 1,
    max: 30,
  },
  dateOfBirth: {
    type: Schema.Types.Date,
    required: true,
    min: 8,
    max: 8,
  },
  tin: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    min: 20,
    max: 20,
  },
  userId: {
    type: Schema.Types.String,
    required: true,
    ref: "user",

  },
  status: {
    type: Schema.Types.String,
    required: true,
    min: 5,
    max: 14,
  },
});

const clientModel = model("client", schema);
module.exports = clientModel;
