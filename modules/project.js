const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Link schema
const linkSchema = new Schema({
  url: { type: String },
  label: { type: String },
});

// Define the PhotoMedia schema
const photoMediaSchema = new Schema({
  link: { type: String },
  description: { type: String },
});

// Define the VideoMedia schema
const videoMediaSchema = new Schema({
  link: { type: String },
  description: { type: String },
});

// Define the Project schema
const projectSchema = new Schema({
  title: { type: String },
  techUsed: { type: [String] },
  links: { type: [linkSchema] },
  features: { type: [String] },
  image: { type: [photoMediaSchema] },
  video: { type: [videoMediaSchema] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// // Define the Link schema
// const linkSchema = new Schema({
//   url: { type: String, required: true },
//   label: { type: String, required: true },
// });

// // Define the PhotoMedia schema
// const photoMediaSchema = new Schema({
//   link: { type: String, required: true },
//   description: { type: String, required: true },
//   imageName: { type: String },
// });

// // Define the VideoMedia schema
// const videoMediaSchema = new Schema({
//   link: { type: String, required: true },
//   description: { type: String, required: true },
// });

// // Define the Project schema
// const projectSchema = new Schema({
//   title: { type: String, required: true },
//   techUsed: { type: [String], required: true },
//   links: { type: [linkSchema], required: true },
//   features: { type: [String], required: true },
//   image: { type: [photoMediaSchema], required: false },
//   video: { type: [videoMediaSchema], required: false },
//   description: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Project = mongoose.model("Project", projectSchema);

// module.exports = Project;
