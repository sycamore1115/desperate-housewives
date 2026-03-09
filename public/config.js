// React Web 核心环境判断：development=开发，production=正式
const isDevelopment = process.env.NODE_ENV === "development";

const URL = isDevelopment
  ? "http://localhost:5173/audios/"
  : "https://championsea.oss-cn-shanghai.aliyuncs.com/phoeny/desperate_housewives/";
export default URL;
