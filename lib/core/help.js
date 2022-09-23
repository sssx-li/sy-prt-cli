function myHelp(program) {
  program.option("-V, --version", "output the version number");
  program.option("list, ls", "output the template list");
}

export default myHelp;
