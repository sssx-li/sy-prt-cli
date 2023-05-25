import inquirer from "inquirer";
import ora from "ora";
import handlebars from "handlebars";
import fs from "fs";
import chalk from "chalk";

import { readFile } from "fs/promises";
import updateNotifier from "update-notifier";

import execFn from "../utils/execFn.js";
import removeDir from "../utils/removeDir.js";
import myConfig from "../utils/config.js";

const TIME = 1000 * 60 * 60 * 24;

const spinner = ora();

function myInit(program) {
  program
    .command("create <project>")
    .description("create a new project")
    .action(async (projectName) => {
      const pkg = JSON.parse(
        await readFile(new URL("../../package.json", import.meta.url))
      );
      const notifier = updateNotifier({
        pkg,
        updateCheckInterval: TIME,
      });
      if (notifier.update) {
        console.log(
          `有新版本可用：${chalk.cyan(
            notifier.update.latest
          )}，建议您在使用前进行更新`
        );
        notifier.notify();
      }
      const config = await myConfig();
      const answer = await inquirer.prompt([
        {
          name: "templateName",
          type: "list",
          message: "请选择你的目标模板",
          choices: Object.keys(config.templates),
        },
      ]);
      spinner.start();
      spinner.text = "正在下载...";
      const { url, branch } = config.templates[answer.templateName];
      const cloneCmd = `git clone -b ${branch} ${url} ${projectName}`;
      await execFn(cloneCmd, spinner);
      // 覆写模板项目中的{{name}}
      const meta = {
        name: projectName,
      };
      const content = fs.readFileSync(`${projectName}/package.json`).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(`${projectName}/package.json`, result);
      // 删除模板中的 .git 文件
      removeDir(`${projectName}/.git`);
      // git init
      let gitInitCmd = `git -C ./${projectName} init`;
      await execFn(gitInitCmd);
      // git add . && git commit
      const gitCommitCmd = `git -C ./${projectName} add . && git -C ./${projectName} commit -m init`;
      await execFn(gitCommitCmd);

      spinner.succeed("下载完成");
      console.log(chalk.cyan(`\n cd ${projectName} && pnpm i \n`));
      process.exit();
    });
}

export default myInit;
