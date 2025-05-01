import {
  ICreateTaskRepository,
  IListTaskRepository,
  IRemoveTaskRepository,
} from "@/domain/repositories/Task.repository.js";
import { Task } from "@/domain/entities/Task.js";

export class CreateTaskRepository implements ICreateTaskRepository {
  private tasks: Task[] = [];

  async execute(task: Task): Promise<Task> {
    this.tasks.push(task);

    return task;
  }
}

export class RemoveTaskRepository implements IRemoveTaskRepository {
  private tasks: Task[] = [];

  async execute(id: number): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const [removedTask] = this.tasks.splice(taskIndex, 1);

    return removedTask;
  }
}

export class ListTaskRepository implements IListTaskRepository {
  private tasks: Task[] = [];

  async execute(): Promise<Task[]> {
    return this.tasks;
  }
}
