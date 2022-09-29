#! /usr/bin/env node

import { program } from "commander";
import { readFile } from "fs/promises";

import myList from "../lib/core/list.js";
import myCreate from "../lib/core/create.js";
import myAdd from "../lib/core/add.js";
import myDelete from "../lib/core/delete.js";
import myUpgrade from "../lib/core/upgrade.js";

// 获取版本号
program.version(
  JSON.parse(await readFile(new URL("../package.json", import.meta.url)))
    .version,
  "-V, --version"
);

myCreate(program);

myList(program);

myAdd(program);

myDelete(program);

myUpgrade(program);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
