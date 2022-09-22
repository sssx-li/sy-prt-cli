#! /usr/bin/env node

import { program } from "commander";

program.option("-V --version", "查看当前版本号"); // 向 --help添加选项说明

program
  .command("create <project> [other...]") // 命令
  .alias("crt") // 别名
  .description("创建项目") // 描述
  .action((projectName, args) => {
    //  <project> -> projectName    [other...] -> args
    console.log(projectName, args);
  });

program.parse(process.argv);
