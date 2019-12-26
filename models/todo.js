const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  list: [
    {
      text: {
        type: String
      },
      active: {
        type: Boolean,
        default: true
      }
    }
  ]
});

const ToDoList = mongoose.model("list", ToDoListSchema);

module.exports = ToDoList;
