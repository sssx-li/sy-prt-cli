#! /usr/bin/env node

import { program } from "commander";
import myHelp from "../lib/core/help.js";
import myList from "../lib/core/list.js";
import myInit from "../lib/core/init.js";

myHelp(program);
myList(program);
myInit(program);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
