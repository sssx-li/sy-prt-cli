import { exec } from "child_process";

const cmd =
  "git clone -b master https://gitee.com/qy-tingyun/vue-admin-template.git ./andy";

exec("cmd", (error) => {
  if (error) {
    console.log("发生了一个错误", chalk.red(JSON.stringify(error)));
    process.exit();
  }
  resolve(true);
});
