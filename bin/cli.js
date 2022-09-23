#! /usr/bin/env node

import { program } from "commander";
import { readFile } from "fs/promises";

import myHelp from "../lib/core/help.js";
import myList from "../lib/core/list.js";
import myInit from "../lib/core/init.js";
import myAdd from "../lib/core/add.js";
import myDelete from "../lib/core/delete.js";

// 获取版本号
program.version(
  JSON.parse(await readFile(new URL("../package.json", import.meta.url)))
    .version,
  "-V, --version"
);

myHelp(program);

myList(program);

myInit(program);

myAdd(program);

myDelete(program);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
