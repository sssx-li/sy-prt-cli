import chalk from 'chalk';
import config from '../../template.json'

module.exports = () => {
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
};
