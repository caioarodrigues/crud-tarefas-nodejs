import { RemoveTaskRepository } from "@/infra/impl/repositories/Task.repository";
import { RemoveTaskUseCase } from "../usecases/RemoveTask/RemoveTaskUseCase";
import { TaskDTO } from "../DTOs/TaskDTO";
import { IRemoveTaskUseCase } from "../usecases/RemoveTask/IRemoveTaskUseCase";

export class RemoveTaskService {
  private removeTaskUseCase: IRemoveTaskUseCase;
  
  constructor() {
    this.removeTaskUseCase = new RemoveTaskUseCase(new RemoveTaskRepository());
  }

  async execute(id: number): Promise<TaskDTO | null> {
    const taskRemoved = await this.removeTaskUseCase.execute(id);
    
    return taskRemoved;
  }
}