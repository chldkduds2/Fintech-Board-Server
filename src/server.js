require("dotenv").config(); // .env 파일에서 환경 변수 로드
const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors"); // CORS 패키지 추가
const postRoutes = require("../routes/postRoutes"); // POST 요청 라우터
const getPostRoutes = require("../routes/getRoutes"); // GET 요청 라우터
const db = require("./database"); // 데이터베이스 연결을 import

const app = express();
const port = process.env.PORT || 8080; // 포트 번호를 환경 변수로부터 가져오기

// CORS 설정
app.use(cors());

// 업로드 설정
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

// 파일 필터 설정
const fileFilter = (req, file, cb) => {
  // 허용할 이미지 파일의 MIME 타입을 설정
  const allowedTypes = /jpeg|jpg|png|gif|webp|bmp|tiff/; // 허용할 이미지 파일 확장자 추가
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

// API 라우팅 설정
app.use("/api/posts", upload.single("image"), postRoutes(db)); // POST 요청 처리
app.use("/api/posts", getPostRoutes(db)); // GET 요청 처리

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
