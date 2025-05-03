import { TaskDTO } from "@/app/DTOs/TaskDTO";

export interface ISetTaskDoneUseCase {
  setDone(id: number, done: boolean): Promise<TaskDTO | null>;
}