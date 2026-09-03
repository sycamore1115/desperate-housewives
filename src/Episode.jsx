import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Loading, Title } from "animal-island-ui";
import URL from "../public/config";

const CARD_COLORS = [
  "app-yellow",
  "app-teal",
  "app-blue",
  "app-pink",
  "app-green",
  "app-orange",
  "lime-green",
  "brown",
];

function Episode() {
  const { eid } = useParams();
  const jsonFilePath = `${URL}/articles/${eid}/episode.json`;
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
        <Title size="large" color="app-yellow">
          {eid.toUpperCase()} 章节
        </Title>
        <Link to="/">
          <Button type="default" size="small">
            返回首页
          </Button>
        </Link>
      </div>

      <ul className="page-list">
        {jsonData.map((part, index) => (
          <li key={part.id}>
            <Link
              className="part-card-link"
              to={`/${eid}/${part.id}?title=${encodeURIComponent(part.title)}`}
            >
              <Card
                color={CARD_COLORS[index % CARD_COLORS.length]}
                hoverable
              >
                <div className="part-card-title">
                  <span className="part-card-index">{part.id.slice(-2)}</span>
                  {part.title}
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Episode;
