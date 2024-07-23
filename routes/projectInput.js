const express = require("express");
const Router = new express.Router();
const multer = require("multer");
const Project = require("../modules/project");
const auth = require("../middleware/Auth");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory for files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the filename to be the original name with a timestamp
    cb(null, file.originalname);
  },
});

// Initialize upload variable with multer storage configuration
const upload = multer({ storage: storage });

Router.post("/create_image", upload.single("file"), async (req, res) => {
  try {
    res.status(200).json("it worked");
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.post("/create_project", async (req, res) => {
  console.log(req.body);
  const project = new Project({
    title: req.body.title,
    techUsed: req.body.techUsed,
    links: req.body.links,
    features: req.body.features,
    image: req.body.images,
    video: req.body.videos,
    description: req.body.description,
  });
  try {
    await project.save();
    res.status(200).send({ project });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

Router.get("/get_projects", async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.get("/get_project/:_id", async (req, res) => {
  try {
    const project = await Project.findById(req.params._id);
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

Router.patch("/update_project/:_id", async (req, res) => {
  try {
    const project = await project.findByIdAndUpdate(req.params._id, req.body, {
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

// const express = require("express");
// const Router = new express.Router();
// const multer = require("multer");
// const Project = require("../modules/project");
// const path = require("path");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(
// //       null,
// //       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
// //     );
// //   },
// // });

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
// //   },
// // });
// // const upload = multer({ storage });

// // Set up multer to use 'uploads/' as the destination for uploaded files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Router.post("/create_image", async (req, res) => {});

// Router.post("/create_project", upload.array("image"), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send("No files uploaded");
//     }

//     const imageUrls = req.files.map((file) => {
//       return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
//     });

//     const project = new Project({
//       title: req.body.title,
//       techUsed: req.body.techUsed,
//       links: req.body.links,
//       features: req.body.features,
//       image: req.body.image,
//       video: req.body.video,
//       description: req.body.description,
//       project_images: imageUrls, // Store image URLs instead of filenames
//     });

//     await project.save();
//     res.status(200).send({ project });
//   } catch (e) {
//     console.error(e);
//     res.status(400).send(e);
//   }
// });

// // Router.post("/create_project", upload.array("image"), async (req, res) => {
// //   try {
// //     if (!req.files || req.files.length === 0) {
// //       return res.status(400).send("No files uploaded");
// //     }

// //     const imageNames = req.files.map((file) => file.filename);

// //     const project = new Project({
// //       project_name: req.body.project_name,
// //       tools: req.body.tools,
// //       summary: req.body.summary,
// //       project_link: req.body.project_link,
// //       features: req.body.features,
// //       project_images: imageNames,
// //     });

// //     await project.save();
// //     res.status(200).send({ project });
// //   } catch (e) {
// //     console.error(e);
// //     res.status(400).send(e);
// //   }
// // });

// Router.get("/get_projects", async (req, res) => {
//   try {
//     const project = await Project.find();
//     res.status(200).send(project);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// Router.get("/get_project/:_id", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params._id);
//     res.status(200).send(project);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// Router.patch("/update_project/:_id", async (req, res) => {
//   try {
//     const project = await project.findByIdAndUpdate(req.params._id, req.body, {
//       new: true,
//     });
//     if (!project) {
//       return res.status(400).send("Project Not Found");
//     }
//     res.status(200).send(project);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// Router.delete("/delete_project/:_id", async (req, res) => {
//   try {
//     const project = await project.findById(req.params.Id);
//     if (!project) {
//       return res.status(404).send("Project not found");
//     }
//     const deleteProject = await project.findByIdAndDelete(req.params._id);
//     res.status(200).send(deleteProject);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// module.exports = Router;
