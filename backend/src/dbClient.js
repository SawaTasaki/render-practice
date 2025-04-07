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

async function insertInitialData() {
  try {
    await client.connect(); // データベースに接続

    // ai_tools テーブルの作成と初期データの挿入
    const aiToolsQuery = `
      CREATE TABLE IF NOT EXISTS ai_tools (
          ai_tool_id SERIAL PRIMARY KEY,
          tool_name VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL
      );
      
      INSERT INTO ai_tools (tool_name, company) VALUES
      ('ChatGPT-4.0', 'OpenAI'),
      ('Grok 3.0', 'xAI'),
      ('Copilot', 'Microsoft'),
      ('Claude', 'Anthropic'),
      ('Devin', 'Cogintion'),
      ('Cursor', 'Anysphere');
    `;
    await client.query(aiToolsQuery); // ai_toolsテーブル作成とデータ挿入

    // users テーブルの作成と初期データの挿入
    const usersQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          favorite_tools INTEGER[]  -- 使用ツールのリスト（最大25個まで）
      );
      
      INSERT INTO users (email, password, favorite_tools) VALUES
      ('user1@example.com', 'password123', ARRAY[1, 2]),
      ('user2@example.com', 'password123', ARRAY[3, 4]),
      ('user3@example.com', 'password123', ARRAY[5, 6, 1]);
    `;
    await client.query(usersQuery); // usersテーブル作成とデータ挿入

    console.log('初期データの挿入が完了しました。');
  } catch (err) {
    console.error('データの挿入中にエラーが発生しました:', err);
  } finally {
    await client.end(); // データベース接続を終了
  }
}

// 初期データを挿入
insertInitialData();

export default client;
