/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";
import { TaskDTO } from "@/app/DTOs/TaskDTO";
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

export interface ISetTaskDoneRepository {
  execute(id: number): Promise<Task | null>;
}

export interface IFilterTaskByKeywordRepository {
  execute(keyword: string): Promise<ListTaskDTO>;
}

export interface IUpdateTaskRepository {
  execute(task: Pick<Task, "id" | "title" | "description" | "status">): Promise<TaskDTO>;
}