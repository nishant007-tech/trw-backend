const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const postRoutes = require("./routes/index");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const Post = require("./routes/post");
const Private = require("./routes/privatepages");
const Blog = require("./routes/blog");
const Auth = require("./routes/auth");
const upload = require("./routes/upload");
const path = require("path");
const social = require("./routes/social");
const address = require("./routes/address");
const logo = require("./routes/logo");
const compliance = require("./routes/compliance");
require("dotenv").config();

const db = require("./config/mongoose");
app.use(cors());
app.use(express.static(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/public", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use("/file", upload);
app.use("/admin", postRoutes);
app.use("/private", Private);
app.use("/home", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/blog", Blog);
app.use("/", Post);
app.use("/api", Auth);
app.use("/social", social);
app.use("/address", address);
app.use("/logo", logo);
app.use("/compliance", compliance);

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server: ${err}`);
  }
  console.log(`server is running on the port:${port}`);
});
