import FtpDeploy from "ftp-deploy";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER || "your-username",
  password: process.env.FTP_PASSWORD || "your-password",
  host: process.env.FTP_HOST || "your-host",
  port: parseInt(process.env.FTP_PORT || "21"),
  localRoot: join(__dirname, "../out"),
  remoteRoot: process.env.FTP_REMOTE_ROOT || "/public_html/",
  include: ["*", "**/*"],
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    ".git/**",
    ".DS_Store"
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

console.log("🚀 FTP 배포를 시작합니다...");
console.log(`대상 호스트: ${config.host}`);
console.log(`로컬 경로: ${config.localRoot}`);
console.log(`원격 경로: ${config.remoteRoot}`);

ftpDeploy
  .deploy(config)
  .then((res) => {
    console.log("\n✅ 배포 성공!");
    console.log("업로드된 파일 수:", res.length);
  })
  .catch((err) => {
    console.error("\n❌ 배포 실패:");
    console.error(err);
    process.exit(1);
  });
