const express = require("express");
const Router = new express.Router();
const multer = require("multer");
const Project = require("../modules/project");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

Router.post("/create_project", upload.array("image"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const imageUrls = req.files.map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`; // Generate URL for each uploaded image
    });

    const project = new Project({
      project_name: req.body.project_name,
      tools: req.body.tools,
      summary: req.body.summary,
      project_link: req.body.project_link,
      features: req.body.features,
      project_images: imageUrls, // Store image URLs instead of filenames
    });

    await project.save();
    res.status(200).send({ project });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

// Router.post("/create_project", upload.array("image"), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send("No files uploaded");
//     }

//     const imageNames = req.files.map((file) => file.filename);

//     const project = new Project({
//       project_name: req.body.project_name,
//       tools: req.body.tools,
//       summary: req.body.summary,
//       project_link: req.body.project_link,
//       features: req.body.features,
//       project_images: imageNames,
//     });

//     await project.save();
//     res.status(200).send({ project });
//   } catch (e) {
//     console.error(e);
//     res.status(400).send(e);
//   }
// });

Router.get("/get_projects", async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.patch("/update_project:_id", async (req, res) => {
  try {
    const project = await project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(400).send("Project Not Found");
    }
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.delete("/delete_project/:_id", async (req, res) => {
  try {
    const project = await project.findById(req.params.Id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    const deleteProject = await project.findByIdAndDelete(req.params._id);
    res.status(200).send(deleteProject);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = Router;
