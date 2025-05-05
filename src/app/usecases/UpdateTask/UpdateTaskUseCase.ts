import { IUpdateTaskUseCase } from "./IUpdateTaskUseCase";
import { IUpdateTaskRepository } from "@/domain/repositories/Task.repository";
import { TaskDTO } from "@/app/DTOs/TaskDTO";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private readonly updateTaskRepository: IUpdateTaskRepository) {}

  async execute(task: Pick<TaskDTO, "id" | "title" | "description" | "status">): Promise<TaskDTO> {
    const updatedTask = await this.updateTaskRepository.execute(task);
  
    return updatedTask;
  }
}