const express = require("express");
const mongoose = require("mongoose");
const Home1 = require("../models/home1");
const Home1_1 = require("../models/home1_1");
const Home2 = require("../models/home2");
const Home3 = require("../models/home3");
const Home4 = require("../models/home4");
const Testimonial = require("../models/testimonial");
const path = require("path");
const router = express.Router();
const multer = require("multer");
var uploadimg = multer({
  storage: multer.diskStorage({
    destination: "./public/img/",

    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".svg" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback("Only images are are allowed", null, false);
    }
    callback(null, true);
  },
});

var uploadvideo = multer({
  storage: multer.diskStorage({
    destination: "./public/video/",

    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return callback("Only videos are allowed", null, false);
    }
    callback(null, true);
  },
});

router.post("/AddTestimonial", uploadimg.single("file"), (req, res) => {
  const testimonialData = new Testimonial({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: `https://cms.deepthought.education:5055/img/${req.file.filename}`,
  });
  console.log(req.body);
  testimonialData.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/getTestimonials", async (req, res) => {
  try {
    const testimonialData = await Testimonial.find();
    res.status(200).json(testimonialData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_testimonial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const testimonialData = await Testimonial.findById(id);

    res.status(200).json(testimonialData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put(
  "/update_testimonial_patch/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, file, description } = req.body;
    if (file) {
      image = file;
    } else {
      image = `https://cms.deepthought.education:5055/img/${req.file.filename}`;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updateTestimonial = { title, subtitle, description, image, _id: id };

    await Testimonial.findByIdAndUpdate(id, updateTestimonial);

    res.json(updateTestimonial);
  }
);

router.delete("/delete_testimonial/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Testimonial.findByIdAndRemove(id);

  res.json({ message: "Testimonial deleted successfully." });
});

router.post("/AddHome2", uploadimg.single("file"), (req, res) => {
  const home2data = new Home2({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: `https://cms.deepthought.education:5055/img/${req.file.filename}`,
  });

  console.log(req.body);

  home2data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});



router.get("/home2s", async (req, res) => {
  try {
    const home2data = await Home2.find();

    res.status(200).json(home2data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_home2/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const home2data = await Home2.findById(id);

    res.status(200).json(home2data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put(
  "/update_home2_patch/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, file, description } = req.body;
    if (file) {
      image = file;
    } else {
      image = `https://cms.deepthought.education:5055/img/${req.file.filename}`;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome2 = { title, subtitle, description, image, _id: id };

    await Home2.findByIdAndUpdate(id, updatehome2);

    res.json(updatehome2);
  }
);

router.delete("/delete_home2/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Home2.findByIdAndRemove(id);

  res.json({ message: "Home2 deleted successfully." });
});

////////////////////////////////////Home3
router.post("/AddHome3", uploadimg.single("file"), (req, res) => {
  const home3data = new Home3({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    image: `https://cms.deepthought.education:5055/img/${req.file.filename}`,
  });

  console.log(req.body);

  home3data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/home3s", async (req, res) => {
  try {
    const home3data = await Home3.find();

    res.status(200).json(home3data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_home3/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const home3data = await Home3.findById(id);

    res.status(200).json(home3data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put(
  "/update_home3_patch/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, file, description } = req.body;
    if (file) {
      image = file;
    } else {
      image = `https://cms.deepthought.education:5055/img/${req.file.filename}`;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome3 = { title, subtitle, description, image, _id: id };

    await Home3.findByIdAndUpdate(id, updatehome3);

    res.json(updatehome3);
  }
);

router.delete("/delete_home3/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Home3.findByIdAndRemove(id);

  res.json({ message: "Home3 deleted successfully." });
});
////////////////////////Home1
// router.post("/AddHome1", uploadvideo.single("file"), (req, res) => {
//   const home1data = new Home1({
//     title: req.body.title,
//     subtitle: req.body.subtitle,
//     video: `https://cms.deepthought.education:5055/video/${req.file.filename}`,
//   });

//   console.log(req.body);

//   home1data.save(function (err, vid) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.status(201).send(vid);
//     }
//   });
// });

// router.get("/update_home1/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const home1data = await Home1.findById(id);

//     res.status(200).json(home1data);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });
// router.put(
//   "/update_home1_patch/:id",
//   uploadvideo.single("file"),
//   async (req, res) => {
//     const { id } = req.params;
//     const { title, subtitle, video } = req.body;
//     video = `https://cms.deepthought.education:5055/video/${req.file.filename}`;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(404).send(`No post with id: ${id}`);

//     const updatehome1 = { title, subtitle, video, _id: id };

//     await Home1.findByIdAndUpdate(id, updatehome1);

//     res.json(updatehome1);
//   }
// );

// router.get("/home1s", async (req, res) => {
//   try {
//     const home1_1data = await Home1.find();

//     res.status(200).json(home1_1data);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// router.delete("/delete_home1/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   await Home1.findByIdAndRemove(id);

//   res.json({ message: "Home1 deleted successfully." });
// });

router.post("/AddHome1", (req, res) => {
  const home1data = new Home1({
    title: req.body.title,
    subtitle: req.body.subtitle,
    // video: `https://cms.deepthought.education:5055/video/${req.file.filename}`,
  });

  console.log(req.body);

  home1data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/update_home1/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const home1data = await Home1.findById(id);

    res.status(200).json(home1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put(
  "/update_home1_patch/:id",

  async (req, res) => {
    const { id } = req.params;
    const { title, subtitle } = req.body;
    // video = `https://cms.deepthought.education:5055/video/${req.file.filename}`;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome1 = { title, subtitle, _id: id };

    await Home1.findByIdAndUpdate(id, updatehome1);

    res.json(updatehome1);
  }
);

router.get("/home1s", async (req, res) => {
  try {
    const home1_1data = await Home1.find();

    res.status(200).json(home1_1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete_home1/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Home1.findByIdAndRemove(id);

  res.json({ message: "Home1 deleted successfully." });
});

//////////////////Home video section !_1

router.post("/AddHome1_1", uploadvideo.single("file"), (req, res) => {
  const home1_1data = new Home1_1({
    video: `https://cms.deepthought.education:5055/video/${req.file.filename}`,
  });

  console.log(req.body);

  home1_1data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/home1_1s", async (req, res) => {
  try {
    const home1_1data = await Home1_1.find();

    res.status(200).json(home1_1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_home1_1/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const home1_1data = await Home1_1.findById(id);

    res.status(200).json(home1_1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put(
  "/update_home1_1_patch/:id",
  uploadvideo.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { file } = req.body;
    if (file) {
      video = file;
    } else {
      video = `https://cms.deepthought.education:5055/video/${req.file.filename}`;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome1_1 = { video, _id: id };

    await Home1_1.findByIdAndUpdate(id, updatehome1_1);

    res.json(updatehome1_1);
  }
);

router.delete("/delete_home1_1/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Home1_1.findByIdAndRemove(id);

  res.json({ message: "Home1_1 deleted successfully." });
});

///////Home4

router.post("/AddHome4", uploadimg.single("file"), (req, res) => {
  const home4data = new Home4({
    title: req.body.title,
    description: req.body.description,
    image: `https://cms.deepthought.education:5055/img/${req.file.filename}`,
    url: req.body.url,
  });

  console.log(req.body);

  home4data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/home4s", async (req, res) => {
  try {
    const home4data = await Home4.find();

    res.status(200).json(home4data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_home4/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const home4data = await Home4.findById(id);

    res.status(200).json(home4data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put(
  "/update_home4_patch/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, description, file, url } = req.body;
    if (file) {
      image = file;
    } else {
      image = `https://cms.deepthought.education:5055/img/${req.file.filename}`;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome4 = { title, description, image, url, _id: id };

    await Home4.findByIdAndUpdate(id, updatehome4);

    res.json(updatehome4);
  }
);

router.delete("/delete_home4/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Home4.findByIdAndRemove(id);

  res.json({ message: "Home4 deleted successfully." });
});

module.exports = router;
