import { UpdateTaskUseCase } from "../usecases/UpdateTask/UpdateTaskUseCase";
import { UpdateTaskRepository } from "@/infra/impl/repositories/Task.repository";
import { TaskDTO } from "../DTOs/TaskDTO";

export class UpdateTaskService {
  private updateTaskUseCase: UpdateTaskUseCase;

  constructor() {
    this.updateTaskUseCase = new UpdateTaskUseCase(new UpdateTaskRepository());
  }

  async execute(task: Pick<TaskDTO, "id" | "title" | "description" | "status">): Promise<TaskDTO> {
    const updatedTask = await this.updateTaskUseCase.execute(task);
    return updatedTask;
  }
}