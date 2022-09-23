import { readFile } from "fs/promises";

// ES中读取json文件
async function myConfig() {
  const config = JSON.parse(
    await readFile(new URL("../../config.json", import.meta.url))
  );
  return config;
}
export default myConfig;
