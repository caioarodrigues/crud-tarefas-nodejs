import inquirer from "inquirer";
import { Task } from "@/domain/entities/Task.js";
import { CreateTaskUseCase } from "@/app/usecases/CreateTask/CreateTaskUseCase.js";
import { CreateTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { validOptions } from "@/domain/constants/options.js";
import { ListTaskCLIUseCase } from "./app/usecases/ListTask/CLI/ListTaskCLIUseCase";
import { ListTaskRepository } from "@/infra/impl/repositories/Task.repository.js";

const createTaskUseCase = new CreateTaskUseCase(new CreateTaskRepository());
const listTaskUseCase = new ListTaskCLIUseCase(new ListTaskRepository());

const task: Task = {
  title: "Test Task",
  description: "This is a test task",
  status: "pending",
  createdAt: new Date(),
  done: false,
  id: 0,
};

async function main() {
  while (true) {
    const options = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option",
        choices: [...validOptions, new inquirer.Separator(), "exit"],
      },
    ]);;

    const { choice } = options;

    if (!validOptions.includes(choice)) {
      console.log("Invalid choice");
      break;
    }

    if (choice === "exit") {
      console.log("Exiting...");
      break;
    }

    if (choice === "create") {
      const createdTask = await createTaskUseCase.execute(task);
      console.log("Task created: \n", createdTask);
    }

    if (choice === "list") {
      listTaskUseCase.execute();
    }
  }
}

main();