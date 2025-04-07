import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

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

app.listen(PORT, () => {
  console.log(`サーバーはポート ${PORT} で動作しています`);
});
