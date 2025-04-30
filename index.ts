import inquirer from "inquirer";
import TaskService from "./services/Task.service.ts";
import TaskRepository from "./repository/Task.repository.ts";

const taskService = new TaskService(new TaskRepository());

const task = {
  title: "Test Task",
  description: "This is a test task",
  status: "pending",
};

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
    switch (answer.choice) {
      case "create": {
        const createdTask = taskService.createTask(task);
        console.log("Task created:", createdTask);
        break;
      }
      case "list": {
        const tasks = taskService.listTasks();
        console.log("Tasks:", tasks);
        break;
      }
      default:
        console.log("Invalid choice");
    }
  });
