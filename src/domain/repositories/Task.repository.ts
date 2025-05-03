/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";
import { Task } from "@/domain/entities/Task.js";

export interface ITaskRepository {}
export interface ICreateTaskRepository {
  execute(task: Task): Promise<Task>;
}

export interface IRemoveTaskRepository {
  execute(id: number): Promise<Task | null>;
}

export interface IListTaskRepository {
  execute(): Promise<ListTaskDTO>;
}

export interface IGetTaskCountRepository {
  execute(): Promise<number>;
}