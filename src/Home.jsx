import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Loading, Title } from "animal-island-ui";
import URL from "../public/config";

const CARD_COLORS = [
  "app-teal",
  "app-yellow",
  "app-pink",
  "app-blue",
  "app-orange",
  "app-green",
  "warm-peach-pink",
  "brown",
];

function Home() {
  const jsonFilePath = `${URL}/articles/home.json`;
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setJsonData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jsonFilePath]);

  if (loading) return <Loading active />;
  if (error) return <div className="status-text">错误：{error}</div>;
  if (!jsonData) return <div className="status-text">无数据</div>;

  return (
    <div className="page-shell">
      <div className="page-hero">
        <Title size="large" color="app-teal">
          绝望主妇第一季台词本
        </Title>
        <div className="page-actions">
          <Link to="/search" className="search-cta-link">
            <Button type="primary" size="large">
              🔍 搜索台词
            </Button>
          </Link>
          <a
            href="https://www.bilibili.com/video/BV19GM36GE7Z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="default" size="middle">
              B站陪伴学习
            </Button>
          </a>
        </div>
      </div>

      <ul className="page-list">
        {jsonData.map((episode, index) => (
          <li key={episode.id}>
            <Link className="episode-card-link" to={`/${episode.id}`}>
              <Card
                color={CARD_COLORS[index % CARD_COLORS.length]}
                pattern={CARD_COLORS[index % CARD_COLORS.length]}
                hoverable
              >
                <div className="episode-card-title">{episode.title}</div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
