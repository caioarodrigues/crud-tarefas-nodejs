/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Task } from "@/domain/entities/Task.js";

export interface ITaskRepository {}
export interface ICreateTaskRepository {
  execute(task: Task): Promise<Task>;
}

export interface IRemoveTaskRepository {
  execute(id: number): Promise<Task>;
}

export interface IListTaskRepository {
  execute(): Promise<Task[]>;
}

export interface IGetTaskCountRepository {
  execute(): Promise<number>;
}