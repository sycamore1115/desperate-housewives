const part = [
  {
    id: 1,
    title: "Mary Alice 独白",
  },
  {
    id: 2,
    title: "Lynette 出场",
  },
];

function Episode({ episode }) {
  return (
    <div>
      <h2>{episode.title}</h2>
    </div>
  );
}

export default Episode;
