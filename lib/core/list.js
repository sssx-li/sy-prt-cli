import chalk from "chalk";
import config from "../../config.js";

function myList(program) {
  let str = "";
  Object.keys(config.templates).forEach((item, index, array) => {
    if (index === array.length - 1) {
      str += item;
    } else {
      str += `${item} \n`;
    }
  });
  program
    .command("list")
    .alias("ls")
    .description("show template list")
    .action(() => {
      console.log(chalk.cyan(str));
      process.exit();
    });
}

export default myList;
