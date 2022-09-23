import { readFile } from "fs/promises";

// 读取配置文件
async function myConfig() {
  const config = JSON.parse(
    await readFile(new URL("../../config.json", import.meta.url))
  );
  return config;
}
export default myConfig;
