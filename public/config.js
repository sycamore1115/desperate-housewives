// React Web 核心环境判断：development=开发，production=正式
const isDevelopment = process.env.NODE_ENV === "development";

const URL = isDevelopment
  ? "http://localhost:1234"
  : "https://wisteria-lane.oss-cn-hangzhou.aliyuncs.com";

// const URL = "https://wisteria-lane.oss-cn-hangzhou.aliyuncs.com";

export default URL;
