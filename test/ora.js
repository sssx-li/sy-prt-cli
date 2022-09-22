import ora from "ora";

const spinner = ora();

spinner.start();
spinner.text = "下载中...";

// spinner.succeed("下载完成");
// spinner.fail("下载失败");
setTimeout(() => {
  spinner.succeed("下载完成");
}, 1000);
