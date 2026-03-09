import { Link } from "react-router-dom";
const episodes = [
  {
    id: "e01",
    title: "第一集",
  },
  {
    id: "e02",
    title: "第二集",
  },
  //   {
  //     id: "03",
  //     title: "第三集",
  //   },
];
function Home() {
  return (
    <div className="App">
      <h1>绝望主妇第一季台词本</h1>
      <ul className="home-content">
        {episodes.map((episode) => (
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
