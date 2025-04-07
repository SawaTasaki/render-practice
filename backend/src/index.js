import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import client from './dbClient.js'; 
import getData from './handlers/getdata.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "https://sample-app-frontend.onrender.com", // フロントエンドのドメインを指定
  methods: ["GET", "POST"], // 許可するHTTPメソッド
  allowedHeaders: ["Content-Type", "Authorization"], // 許可するヘッダ
};

app.use(cors(corsOptions));
app.use(express.json());

const dummyData = [
  { id: 1, tool_name: "AI Tool 1", company: "Company A" },
  { id: 2, tool_name: "AI Tool 2", company: "Company B" },
  { id: 3, tool_name: "AI Tool 3", company: "Company C" },
  { id: 4, tool_name: "AI Tool 4", company: "Company D" },
];

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/showdata", (req, res) => {
  res.json(dummyData);
});

app.get("/getdata", (req, res) => getData(client, req, res));

app.listen(PORT, () => {
  console.log(`サーバーはポート ${PORT} で動作しています`);
});
