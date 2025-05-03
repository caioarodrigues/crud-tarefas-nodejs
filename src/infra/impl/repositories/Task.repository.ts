import {
  ICreateTaskRepository,
  IListTaskRepository,
  IRemoveTaskRepository,
} from "@/domain/repositories/Task.repository.js";
import { Task } from "@/domain/entities/Task.js";
import { verifyExistenceOfFile, createFile, readFile, removeFile } from "@/app/utils/FileOperations";
import { dbFileName, dbFileFormat } from "@/domain/constants/files";
import { TaskDTO } from "@/app/DTOs/TaskDTO";
import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";

let localTasks: Task[] = [];

export class CreateTaskRepository implements ICreateTaskRepository {
  async execute(task: Task): Promise<Task> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    localTasks.push(task);

    if (!dbExists) {
      await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });
      return task;
    }

    await removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });

    return task;
  }
}

export class RemoveTaskRepository implements IRemoveTaskRepository {
  async execute(id: number): Promise<Task> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    if (!dbExists) {
      throw new Error("Database does not exist");
    }

    const filteredTasks = localTasks.filter((task) => task.id !== id);
    const taskToRemove = localTasks.find((task) => task.id === id);

    console.log("Filtered tasks:", filteredTasks);
    console.log("Tasks to remove:", taskToRemove);
    localTasks = filteredTasks;

    await removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    await createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify(localTasks, null, 2) });

    return taskToRemove as Task;
  }
}

export class ListTaskRepository implements IListTaskRepository {
  async execute(): Promise<ListTaskDTO> {
    const dbExists = await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName });

    if (!dbExists) {
      return { tasks: [], count: 0 };
    }

    const tasks: TaskDTO[] = await readFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    const count = tasks.length;

    return { tasks, count };
  }
}

export class GetTaskCountRepository implements GetTaskCountRepository {
  async execute(): Promise<number> {
    return localTasks.length;
  }
}
