const { Client } = require("pg");

// 環境変数からデータベースURLを取得
const client = new Client({
  connectionString: process.env.DB_HOST,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("データベースに接続していますよ"))
  .catch((err) => console.error("データベース接続エラーですよ:", err.stack));

export default client;

// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// client.connect();

// export default client;
