import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import URL from "../public/config";

function Home() {
  const jsonFilePath = `${URL}/articles/home.json`;

  // 定义状态存储 JSON 数据
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 异步读取 public/articles 中的 JSON 文件
  useEffect(() => {
    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `请求失败：${response.status} ${response.statusText}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data); // 存储解析后的数据
      })
      .catch((err) => {
        setError(err.message); // 捕获错误
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jsonFilePath]); // 空依赖数组：仅组件挂载时执行一次
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;
  if (!jsonData) return <div>无数据</div>;
  return (
    <div className="App">
      <h1>绝望主妇第一季台词本</h1>
      <ul className="home-content">
        {jsonData.map((episode) => (
          <li>
            <Link to={`/${episode.id}`} key={episode.id}>
              {episode.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
