import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import myConfig from "../utils/config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function myDelete(program) {
  program
    .command("delete")
    .alias("del")
    .action(async () => {
      const config = await myConfig();
      const { templateName } = await inquirer.prompt([
        {
          name: "templateName",
          type: "input",
          message: "请输入要删除的模板名称:",
          validate: function (value) {
            if (value.trim().length) {
              if (!config.templates[value]) {
                return "模板不存在，请重新输入";
              } else {
                return true;
              }
            } else {
              return "请输入要删除的模板名称";
            }
          },
        },
      ]);
      delete config.templates[templateName];
      fs.writeFile(
        path.resolve(__dirname, "../../config.json"),
        JSON.stringify(config),
        "utf-8",
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(chalk.green("模板已删除!"));
          }
          process.exit();
        }
      );
    });
}

export default myDelete;
