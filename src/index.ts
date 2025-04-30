import inquirer from "inquirer";
import { Task } from "@/domain/entities/Task";
import { CreateTaskUseCase } from "./app/usecases/CreateTask/CreateTaskUseCase";
import { CreateTaskRepository } from "./infra/impl/repositories/Task.repository";

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
        const createdTask = createTaskUseCase.execute(task);
        console.log("Task created: \n", createdTask);
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
