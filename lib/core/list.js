import chalk from "chalk";
import myConfig from "../utils/config.js";

function myList(program) {
  program
    .command("list")
    .alias("ls")
    .description("show template list")
    .action(async () => {
      const config = await myConfig();
      let str = "";
      Object.keys(config.templates).forEach((item, index, array) => {
        if (index === array.length - 1) {
          str += item;
        } else {
          str += `${item} \n`;
        }
      });
      console.log(chalk.cyan(str));
      process.exit();
    });
}

export default myList;
