import inquirer from "inquirer";
import { Task } from "@/domain/entities/Task.js";
import { CreateTaskUseCase } from "@/app/usecases/CreateTask/CreateTaskUseCase.js";
import { CreateTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { validOptions } from "@/domain/constants/options.js";
import { ListTaskCLIUseCase } from "./app/usecases/ListTask/CLI/ListTaskCLIUseCase";
import { ListTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { resolveFilePath } from "@/app/utils/FileOperations";
import { RemoveTaskUseCase } from "./app/usecases/RemoveTask/RemoveTaskUseCase";
import { RemoveTaskRepository } from "@/infra/impl/repositories/Task.repository.js";

const createTaskUseCase = new CreateTaskUseCase(new CreateTaskRepository());
const listTaskUseCase = new ListTaskCLIUseCase(new ListTaskRepository());
const removeTaskUseCase = new RemoveTaskUseCase(new RemoveTaskRepository());

console.log(resolveFilePath({ fileName: "tasks", fileFormat: ".json" }));

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
      await createTaskUseCase.execute(task);
    }

    if (choice === "list") {
      listTaskUseCase.execute();
    }

    if (choice === "remove") {
      const { id } = await inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "Enter the ID of the task to remove",
        },
      ]);

      const removedTask = await removeTaskUseCase.execute(id);
      console.log("Task removed:", removedTask);
    }
  }
}

main();