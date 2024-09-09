require("dotenv").config(); 
const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors"); 
const postRoutes = require("../routes/postRoutes"); 
const getPostRoutes = require("../routes/getRoutes"); 
const db = require("./database"); 

const app = express();
const port = process.env.PORT || 8080; 

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 파일명에 현재 시간과 원본 파일명을 결합하여 중복 방지
    const timestamp = Date.now();
    const originalName = file.originalname;
    cb(null, `${timestamp}-${originalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|bmp|tiff/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));

app.use("/api/posts", upload.single("image"), postRoutes(db)); 
app.use("/api/posts", getPostRoutes(db)); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
