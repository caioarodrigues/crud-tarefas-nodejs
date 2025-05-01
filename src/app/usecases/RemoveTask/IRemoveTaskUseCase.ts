import { Task } from "../../../domain/entities/Task.js";

export interface IRemoveTaskUseCase {
  execute(id: number): Promise<Task>;
}