const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative age aren't real.");
    },
  },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;