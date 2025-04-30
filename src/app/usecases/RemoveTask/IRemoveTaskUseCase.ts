import { Task } from "../../../domain/entities/Task";

export interface IRemoveTaskUseCase {
  execute(id: number): Promise<Task>;
}