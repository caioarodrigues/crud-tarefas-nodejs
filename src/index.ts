import inquirer from "inquirer";
import { CreateTaskService } from "./app/services/CreateTask.service";
import { CreateTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { validOptions } from "@/domain/constants/options.js";
import { ListTaskService } from "./app/services/ListTask.service";
import { ListTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { RemoveTaskUseCase } from "./app/usecases/RemoveTask/RemoveTaskUseCase";
import { RemoveTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { GetTaskCountRepository } from "@/infra/impl/repositories/Task.repository.js";
import { BaseCreateTaskDTO } from "./app/DTOs/CreateTaskDTO";

const createTaskService = new CreateTaskService({
  createTaskRepository: new CreateTaskRepository(),
  getTaskCountRepository: new GetTaskCountRepository(),
});

const listTaskService = new ListTaskService(new ListTaskRepository());
const removeTaskUseCase = new RemoveTaskUseCase(new RemoveTaskRepository());


const task: BaseCreateTaskDTO = {
  title: "Test Task",
  description: "This is a test task",
  status: "pending",
  done: false,
};

async function main() {
  while (true) {
    try {
      const options = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "Choose an option",
          choices: [...validOptions, new inquirer.Separator(), "exit"],
        },
      ]);

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
        await createTaskService.create(task);
      }

      if (choice === "list") {
        listTaskService.listAll();
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
    } catch {
      break;
    }
  }
}

main();
