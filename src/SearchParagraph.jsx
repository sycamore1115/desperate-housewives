function parseParagraphId(id) {
  const match = id?.match(/^(e\d+)(p\d{2})/);
  if (!match) return { episode: "", part: "" };
  return { episode: match[1], part: match[2] };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightContent(content, keyword) {
  if (!content || !keyword) return content;

  const pattern = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
  const parts = content.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={index} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function SearchParagraph({ id, content, title, keyword }) {
  const { episode, part } = parseParagraphId(id);

  function handleOpenPart() {
    if (!episode || !part) return;
    const titleQuery = title ? `?title=${encodeURIComponent(title)}` : "";
    window.open(
      `/${episode}/${part}${titleQuery}#${id}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div
      className="paragraph search-paragraph"
      id={id}
      onClick={handleOpenPart}
    >
      <p className="en-line">{highlightContent(content, keyword)}</p>
    </div>
  );
}

export default SearchParagraph;
