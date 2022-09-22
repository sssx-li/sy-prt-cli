import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "项目名",
      type: "list",
      message: "请选择你需要的项目模板：",
      choices: ["vue", "react"],
    },
  ])
  .then((answer) => {
    console.log("answer", answer);
  });
