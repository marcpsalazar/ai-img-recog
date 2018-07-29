const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  path: {
    type: String,
    required: true
  }
});

const Tree = mongoose.model("Tree", TreeSchema);

module.exports = Tree;

// const TreeSchema = new Schema({
//     path: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User"
//     }
// });