import "./App.css";

const episodes = [
  {
    id: 1,
    title: "第一集",
  },
  {
    id: 2,
    title: "第二集",
  },
];
// TODO 单页面应用是怎么做跳转的？
function App() {
  return (
    <div className="App">
      <header>绝望主妇第一季台词本</header>
      <div>
        {episodes.map((episode) => (
          <p key={episode.id}>{episode.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
