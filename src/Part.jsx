import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Paragraph from "./Paragraph";
import URL from "../public/config";

function Part() {
  const { eid, pid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title");
  const id = `${eid}${pid}`;
  const jsonFilePath = `${URL}/articles/${eid}/${id}.json`;
  const audioFilePath = `${URL}/audios/${eid}/${id}s.mp3`;
  // 定义状态存储 JSON 数据
  const [jsonData, setJsonData] = useState(null);
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

  // 渲染加载、错误、数据状态
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;
  if (!jsonData) return <div>无数据</div>;

  return (
    <>
      <header className="header">
        <h1>{title}</h1>
        <audio src={audioFilePath} controls></audio>
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
          />
        ))}
      </div>
      <div className="footer">
        <p>怕什么真理无穷，进一寸有一寸的欢喜 🍀</p>
      </div>
    </>
  );
}
export default Part;
