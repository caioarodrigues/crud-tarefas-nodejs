import {
  ICreateTaskRepository,
  IListTaskRepository,
  IRemoveTaskRepository,
  ITaskRepository,
} from "@/domain/repositories/Task.repository.js";
import { Task } from "@/domain/entities/Task.js";

export class TaskRepository implements ITaskRepository {
  constructor(protected tasks: Task[] = []) { }
}

export class CreateTaskRepository extends TaskRepository implements ICreateTaskRepository {
  async execute(task: Task): Promise<Task> {
    this.tasks.push(task);

    return task;
  }
}

export class RemoveTaskRepository extends TaskRepository implements IRemoveTaskRepository {
  async execute(id: number): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const [removedTask] = this.tasks.splice(taskIndex, 1);

    return removedTask;
  }
}

export class ListTaskRepository extends TaskRepository implements IListTaskRepository {
  async execute(): Promise<Task[]> {
    return this.tasks;
  }
}
