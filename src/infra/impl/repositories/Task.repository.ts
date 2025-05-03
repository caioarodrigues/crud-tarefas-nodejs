import {
  ICreateTaskRepository,
  IFilterTaskByKeywordRepository,
  IListTaskRepository,
  IRemoveTaskRepository,
  ISetTaskDoneRepository,
  IUpdateTaskRepository,
} from "@/domain/repositories/Task.repository.js";
import { Task } from "@/domain/entities/Task.js";
import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";
import { TaskDTO } from "@/app/DTOs/TaskDTO";

const localTasks: Task[] = [];

export class CreateTaskRepository implements ICreateTaskRepository {
  async execute(task: Task): Promise<Task> {
    localTasks.push(task);

    return task;
  }
}

export class RemoveTaskRepository implements IRemoveTaskRepository {
  async execute(id: number): Promise<Task | null> {
    if (id < 0 || id >= localTasks.length) {
      console.log("Invalid task ID");

      return null;
    }

    const indexTaskToRemove = localTasks.findIndex((task) => task.id === id);
    const [taskRemoved] = localTasks.splice(indexTaskToRemove, 1);

    return taskRemoved;
  }
}

export class ListTaskRepository implements IListTaskRepository {
  async execute(): Promise<ListTaskDTO> {
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
    localTasks[indexTaskToUpdate].updatedAt = new Date();

    return taskToUpdate;
  }
}