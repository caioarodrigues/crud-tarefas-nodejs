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
import { FileOperations } from "@/app/utils/FileOperations";

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

    const tasks: TaskDTO[] = await readFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    // const loadedTasks = tasks.map((task) => new Task(task));

    console.log("[tasks]", tasks.length, tasks[0].id);
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
