import {
  ICreateTaskRepository,
  IFilterTaskByKeywordRepository,
  IListTaskRepository,
  IRemoveTaskRepository,
  ISetTaskDoneRepository,
  IUpdateTaskRepository,
} from "@/domain/repositories/Task.repository.js";
import { Task } from "@/domain/entities/Task.js";
import { verifyExistenceOfFile, createFile, removeFile } from "@/app/utils/FileOperations";
import { dbFileName, dbFileFormat } from "@/domain/constants/files";
import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";
import { FileOperations } from "@/app/utils/FileOperations";
import { TaskDTO } from "@/app/DTOs/TaskDTO";

const fileOperations = new FileOperations();
const localTasks: Task[] = [];

export class CreateTaskRepository implements ICreateTaskRepository {
  async execute(task: Task): Promise<Task> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    localTasks.push(task);

    if (!dbExists) {
      await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });
      return task;
    }

    // const loadedTasks = tasks.map((task) => new Task(task));

    // console.log("[loadedTasks]", loadedTasks);

    await removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });

    return task;
  }
}

export class RemoveTaskRepository implements IRemoveTaskRepository {
  async execute(id: number): Promise<Task | null> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    if (!dbExists) {
      throw new Error("Database does not exist");
    }

    if (id < 0 || id >= localTasks.length) {
      console.log("Invalid task ID");

      return null;
    }

    const indexTaskToRemove = localTasks.findIndex((task) => task.id === id);
    const [taskRemoved] = localTasks.splice(indexTaskToRemove, 1);

    // await removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    // await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });

    //return taskToRemove as Task;
    return taskRemoved;
  }
}

export class ListTaskRepository implements IListTaskRepository {
  async execute(): Promise<ListTaskDTO> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    if (!dbExists) {
      return { tasks: [], count: 0 };
    }

    //const tasks = await fileOperations.read();
    //const count = tasks.length;

    return { tasks: localTasks, count: localTasks.length };
  }
}

export class GetTaskCountRepository implements GetTaskCountRepository {
  async execute(): Promise<number> {
    return localTasks.length;
  }
}

export class SetTaskDoneRepository implements ISetTaskDoneRepository {
  async execute(id: number): Promise<TaskDTO | null> {
    const indexTaskToSetDone = localTasks.findIndex((task) => task.id === id);
    const taskToUpdate = localTasks[indexTaskToSetDone];

    console.log("[taskToSetDone]", taskToUpdate);

    if (indexTaskToSetDone < 0) {
      console.log("Task not found");

      return null;
    }

    const updatedTask = { ...taskToUpdate, status: "done" };

    delete localTasks[indexTaskToSetDone];
    localTasks[indexTaskToSetDone] = updatedTask;

    return localTasks[indexTaskToSetDone];
  }
}

export class FilterTaskByKeywordRepository implements IFilterTaskByKeywordRepository {
  async execute(keyword: string): Promise<ListTaskDTO> {
    const filteredTitles = localTasks.filter((task) => task.title.includes(keyword));
    const filteredDescriptions = localTasks.filter((task) => task.description.includes(keyword));
    const filteredTasks = new Set([...filteredTitles, ...filteredDescriptions]);

    return { tasks: [...filteredTasks], count: filteredTasks.size };
  }
}

export class UpdateTaskRepository implements IUpdateTaskRepository {
  async execute(task: Pick<Task, "id" | "title" | "description" | "status">): Promise<TaskDTO> {
    const indexTaskToUpdate = localTasks.findIndex((task) => task.id === task.id);
    const taskToUpdate = localTasks[indexTaskToUpdate];

    taskToUpdate.status = task.status;
    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;

    localTasks[indexTaskToUpdate] = taskToUpdate;

    return taskToUpdate;
  }
}