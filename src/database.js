require("dotenv").config(); // .env 파일에서 환경 변수 로드
const mysql = require("mysql2");

// 데이터베이스 연결 구성
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

// 데이터베이스 객체를 모듈로 내보내기
module.exports = db;
