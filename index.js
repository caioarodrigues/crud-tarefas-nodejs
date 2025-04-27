import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option",
      choices: ["create", "list", "remove"],
    },
  ])
  .then((answer) => {
    console.log(answer.choice);
  });
