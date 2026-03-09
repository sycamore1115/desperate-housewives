// React Web 核心环境判断：development=开发，production=正式
const isDevelopment = process.env.NODE_ENV === "development";

const URL = isDevelopment
  ? "audios/"
  : "https://championsea.oss-cn-shanghai.aliyuncs.com/phoeny/desperate_housewives/";
export default URL;
