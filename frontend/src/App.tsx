import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  // ダミーデータを格納するための状態
  const [tools, setTools] = useState<Array<{ id: number; tool_name: string; company: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect でデータを取得する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/showdata");
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data = await response.json();
        setTools(data); // 取得したデータを状態にセット
      } catch (err: any) {
        setError(err.message); // エラーメッセージを設定
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    };

    fetchData(); // データを取得
  }, []); // コンポーネントがマウントされたときにのみ実行

  return (
    <div>
      <h1>AI Tools</h1>

      {loading && <p>Loading...</p>} {/* ローディング中の表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* エラーがあれば表示 */}

      {/* データが取得できた場合 */}
      {!loading && !error && (
        <ul>
          {tools.map((tool) => (
            <li key={tool.id}>
              <strong>{tool.tool_name}</strong> by {tool.company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
