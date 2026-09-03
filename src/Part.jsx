import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, Title } from "animal-island-ui";
import Paragraph from "./Paragraph";
import URL from "../public/config";

function Part() {
  const { eid, pid } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const id = `${eid}${pid}`;
  const jsonFilePath = `${URL}/articles/${eid}/${id}.json`;
  const audioFilePath = `${URL}/audios/${eid}/${id}s.mp3`;
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("read");
  const [focusId, setFocusId] = useState("");

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

  useEffect(() => {
    if (!jsonData) return;

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return;

    setFocusId(targetId);

    const timer = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);

    const clearTimer = setTimeout(() => {
      setFocusId("");
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, [jsonData]);

  if (loading) return <div className="status-text">加载中...</div>;
  if (error) return <div className="status-text">错误：{error}</div>;
  if (!jsonData) return <div className="status-text">无数据</div>;

  return (
    <div className="page-shell">
      <header className="header">
        <Title size="middle" color="app-orange">
          {title || "台词阅读"}
        </Title>
        <div className="subtitle">
          <audio src={audioFilePath} controls></audio>
          <Button
            type={mode === "read" ? "primary" : "default"}
            size="small"
            onClick={() => setMode("read")}
          >
            阅读
          </Button>
          <Button
            type={mode === "write" ? "primary" : "default"}
            size="small"
            onClick={() => setMode("write")}
          >
            听写
          </Button>
          <Link to={`/${eid}`}>
            <Button type="dashed" size="small">
              返回章节
            </Button>
          </Link>
        </div>
      </header>
      <audio id="audioPlayer"></audio>
      <div className="container">
        {jsonData.map((paragraph) => (
          <Paragraph
            key={paragraph.id}
            episode={eid}
            id={paragraph.id}
            content={paragraph.content}
            speaker={paragraph.speaker}
            readable={paragraph.readable}
            mark={paragraph.mark}
            mode={mode}
            highlighted={paragraph.id === focusId}
          />
        ))}
      </div>
      <div className="footer">
        <p>怕什么真理无穷，进一寸有一寸的欢喜</p>
      </div>
    </div>
  );
}

export default Part;
