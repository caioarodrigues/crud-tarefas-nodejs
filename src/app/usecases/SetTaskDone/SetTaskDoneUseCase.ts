import { TaskDTO } from "@/app/DTOs/TaskDTO";
import { ISetTaskDoneUseCase } from "./ISetTaskDoneUseCase";
import { ISetTaskDoneRepository } from "@/domain/repositories/Task.repository";

export class SetTaskDoneUseCase implements ISetTaskDoneUseCase {
  constructor(private setTaskDoneRepository: ISetTaskDoneRepository) {}

  async setDone(taskId: number): Promise<TaskDTO | null> {
    const task = await this.setTaskDoneRepository.execute(taskId);
    
    return task;
  }
}