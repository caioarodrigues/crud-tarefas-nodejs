import { TaskDTO } from "@/app/DTOs/TaskDTO";


export interface IUpdateTaskUseCase {
  execute(task: Pick<TaskDTO, "id" | "title" | "description" | "status">): Promise<TaskDTO>;
}