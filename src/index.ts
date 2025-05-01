import inquirer from "inquirer";
import { Task } from "@/domain/entities/Task.js";
import { CreateTaskUseCase } from "./app/usecases/CreateTask/CreateTaskUseCase.js";
import { CreateTaskRepository } from "./infra/impl/repositories/Task.repository.js";

const createTaskUseCase = new CreateTaskUseCase(new CreateTaskRepository());

const task: Task = {
  title: "Test Task",
  description: "This is a test task",
  status: "pending",
  createdAt: new Date(),
  done: false,
  id: 0,
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
        const createdTask = createTaskUseCase.execute(task)
          .then((task) => {
            console.log("Task created: \n", task);
          });

        break;
      }
      case "list": {
        //const tasks = listTaskUseCase.execute();
        console.log("Tasks: \n", []);
        break;
      }
      default:
        console.log("Invalid choice");
    }
  });
