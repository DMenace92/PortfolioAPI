const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  techUsed: { type: [String], required: true },
  links: { type: String },
  features: { type: [String] },
  image: { type: [String] },
  video: { type: [String] },
  discription: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
