import { useEffect, useState } from "react";
import SearchParagraph from "./SearchParagraph";
import URL from "../public/config";

function Search() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [titleMap, setTitleMap] = useState({});
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeKeyword, setActiveKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [searchRes, homeRes] = await Promise.all([
          fetch(`${URL}/articles/search.json`),
          fetch(`${URL}/articles/home.json`),
        ]);

        if (!searchRes.ok) {
          throw new Error(
            `请求失败：${searchRes.status} ${searchRes.statusText}`,
          );
        }
        if (!homeRes.ok) {
          throw new Error(`请求失败：${homeRes.status} ${homeRes.statusText}`);
        }

        const [searchJson, homeJson] = await Promise.all([
          searchRes.json(),
          homeRes.json(),
        ]);

        const episodeParts = await Promise.all(
          homeJson.map(async (episode) => {
            const res = await fetch(
              `${URL}/articles/${episode.id}/episode.json`,
            );
            if (!res.ok) {
              throw new Error(`请求失败：${res.status} ${res.statusText}`);
            }
            const parts = await res.json();
            return { episodeId: episode.id, parts };
          }),
        );

        const nextTitleMap = {};
        episodeParts.forEach(({ episodeId, parts }) => {
          parts.forEach((part) => {
            nextTitleMap[`${episodeId}/${part.id}`] = part.title;
          });
        });

        setSearchData(Array.isArray(searchJson) ? searchJson : []);
        setTitleMap(nextTitleMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const keyword = query.toLowerCase();
    setHasSearched(true);
    setActiveKeyword(query);

    if (!keyword) {
      setResults([]);
      return;
    }

    setResults(
      searchData.filter((item) =>
        item.content?.toLowerCase().includes(keyword),
      ),
    );
  }

  function getTitleById(id) {
    const match = id?.match(/^(e\d+)(p\d{2})/);
    if (!match) return "";
    return titleMap[`${match[1]}/${match[2]}`] || "";
  }

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <>
      <header className="header">
        <h1>全文搜索</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入台词关键词..."
          />
          <button className="search-submit" type="submit">
            搜索
          </button>
        </form>
      </header>
      <div className="container">
        {!hasSearched ? (
          <p className="search-empty">输入关键词后，结果会显示在这里</p>
        ) : results.length === 0 ? (
          <p className="search-empty">没有找到相关台词</p>
        ) : (
          results.map((paragraph) => (
            <SearchParagraph
              key={paragraph.id}
              id={paragraph.id}
              content={paragraph.content}
              title={getTitleById(paragraph.id)}
              keyword={activeKeyword}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Search;
