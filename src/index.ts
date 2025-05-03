import inquirer from "inquirer";
import { CreateTaskService } from "./app/services/CreateTask.service";
import { CreateTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { validOptions } from "@/domain/constants/options.js";
import { ListTaskService } from "./app/services/ListTask.service";
import { ListTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { RemoveTaskUseCase } from "./app/usecases/RemoveTask/RemoveTaskUseCase";
import { RemoveTaskRepository } from "@/infra/impl/repositories/Task.repository.js";
import { GetTaskCountRepository } from "@/infra/impl/repositories/Task.repository.js";
import { SetTaskDoneRepository } from "@/infra/impl/repositories/Task.repository.js";
import { SetTaskDoneUseCase } from "./app/usecases/SetTaskDone/SetTaskDoneUseCase";
import { FilterByKeywordUseCase } from "./app/usecases/FilterByKeyWord/FilterByKeyWord";
import { FilterTaskByKeywordRepository } from "@/infra/impl/repositories/Task.repository.js";

const createTaskService = new CreateTaskService({
  createTaskRepository: new CreateTaskRepository(),
  getTaskCountRepository: new GetTaskCountRepository(),
});

const setTaskDoneUseCase = new SetTaskDoneUseCase(new SetTaskDoneRepository());
const filterTaskByKeywordUseCase = new FilterByKeywordUseCase(new FilterTaskByKeywordRepository());
const listTaskService = new ListTaskService(new ListTaskRepository());
const removeTaskUseCase = new RemoveTaskUseCase(new RemoveTaskRepository());

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
        const createTaskOptions = await inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the task title",
          },
          {
            type: "input",
            name: "description",
            message: "Enter the task description",
          },
          {
            type: "list",
            name: "status",
            message: "Select the task status",
            choices: ["pending", "in-progress", "completed"],
          },
          {
            type: "confirm",
            name: "done",
            message: "Is the task done?",
            choices: [true, false],
            default: false,
          },
        ]);

        await createTaskService.create(createTaskOptions);
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

      if (choice === "set as done") {
        const undoneTasks = await listTaskService.listAll();
        const shownTasks = undoneTasks.tasks.filter((task) => task.status !== "done")
          .map(({ title, id, description }) => `${id} - ${title} \n\t ${description}`);

        const { result } = await inquirer.prompt([
          {
            type: "select",
            name: "result",
            message: "Select the task to set as done",
            choices: [...shownTasks, "exit"],
          },
        ]);

        const id = result.split(" - ")[0];
        const task = await setTaskDoneUseCase.setDone(parseInt(id));

        console.log("Task set as done:", task);
      }

      if (choice === "filter by keyword") {
        const { keyword } = await inquirer.prompt([
          {
            type: "input",
            name: "keyword",
            message: "Enter the keyword to filter tasks",
          },
        ]);

        const filteredTasks = await filterTaskByKeywordUseCase.filterByKeyword(keyword);
        console.log("Filtered tasks:", filteredTasks);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      break;
    }
  }
}

main();
