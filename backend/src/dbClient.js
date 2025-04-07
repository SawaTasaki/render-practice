import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// client.connect();

// ai_tools テーブルの作成
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ai_tools (
      ai_tool_id SERIAL PRIMARY KEY,
      tool_name VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL
  );
`;

// 初期データの挿入
const insertDataQuery = `
  INSERT INTO ai_tools (tool_name, company) VALUES
  ('ChatGPT-4.0', 'OpenAI'),
  ('Grok 3.0', 'xAI'),
  ('Copilot', 'Microsoft'),
  ('Claude', 'Anthropic'),
  ('Devin', 'Cogintion'),
  ('Cursor', 'Anysphere');
`;

// users テーブルの作成
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      favorite_tools INTEGER[]  -- 使用ツールのリスト（最大25個まで）
  );
`;

// 初期データの挿入
const insertUsersDataQuery = `
  INSERT INTO users (email, password, favorite_tools) VALUES
  ('user1@example.com', 'password123', ARRAY[1, 2]),
  ('user2@example.com', 'password123', ARRAY[3, 4]),
  ('user3@example.com', 'password123', ARRAY[5, 6, 1]);
`;

try {
  await client.connect();

  // テーブル作成
  await client.query(createTableQuery);
  console.log("ai_toolsテーブルの作成が完了しました。");

  // 初期データの挿入
  await client.query(insertDataQuery);
  console.log("初期データの挿入が完了しました。");

  // usersテーブルの作成
  await client.query(createUsersTableQuery);
  console.log("usersテーブルの作成が完了しました。");

  // 初期データの挿入
  await client.query(insertUsersDataQuery);
  console.log("初期データの挿入が完了しました。");
  
} catch (err) {
  console.error("エラーが発生しました:", err);
} finally {
  await client.end();
}

export default client;
