import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import fs from "fs";

import myConfig from "../utils/config.js";

function myAdd(program) {
  program
    .command("add")
    .alias("a")
    .description("add a new template")
    .action(async () => {
      clear();
      const config = await myConfig();
      const answer = await inquirer.prompt([
        {
          name: "templateName",
          type: "input",
          message: "请输入模板名称:",
          validate(value) {
            if (value.trim().length) {
              const valid = config.templates[value]
                ? "模板已存在，请重新输入"
                : true;
              return valid;
            } else {
              return "请输入模板名称";
            }
          },
        },
        {
          name: "gitLink",
          type: "input",
          message: "请输入模板项目地址:",
          validate: function (value) {
            if (value.trim().length) {
              return true;
            } else {
              return "请输入模板项目地址";
            }
          },
        },
        {
          name: "branch",
          type: "input",
          message: "请输入分支名称:",
          validate: function (value) {
            if (value.trim().length) {
              return true;
            } else {
              return "请输入分支名称";
            }
          },
        },
      ]);
      const { templateName, gitLink, branch } = answer;
      config.templates[templateName] = {};
      // 过滤unicode字符
      config.templates[templateName].url = gitLink.replace(
        /[\u0000-\u0019]/g,
        ""
      );
      config.templates[templateName].branch = branch;
      // 写入模板
      fs.writeFile("./config.json", JSON.stringify(config), "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(chalk.green("新模板添加成功！\n"));
        }
        process.exit();
      });
    });
}

export default myAdd;
