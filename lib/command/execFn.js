import { exec } from "child_process";
import chalk from "chalk";

function execFn(cmd, spinner) {
  return new Promise((resolve) => {
    exec(cmd, (error) => {
      if (error) {
        console.log("发生了一个错误：", chalk.red(JSON.stringify(error)));
        spinner.fail("下载失败");
        process.exit();
      }
      resolve(true);
    });
  });
}

export default execFn;
