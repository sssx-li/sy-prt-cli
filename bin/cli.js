#! /usr/bin/env node

import { program } from "commander";
import myHelp from "../lib/core/help.js";
import myInit from "../lib/core/init.js";

myHelp(program);
myInit(program);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
