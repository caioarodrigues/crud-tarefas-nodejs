import { TaskDTO } from "../DTOs/TaskDTO";
import { SetTaskDoneUseCase } from "../usecases/SetTaskDone/SetTaskDoneUseCase";
import { SetTaskDoneRepository } from "@/infra/impl/repositories/Task.repository";

export class SetTaskDoneService {
  private setTaskDoneUseCase: SetTaskDoneUseCase;

  constructor() {
    this.setTaskDoneUseCase = new SetTaskDoneUseCase(new SetTaskDoneRepository());
  }

  async execute(id: number): Promise<TaskDTO | null> {
    return await this.setTaskDoneUseCase.setDone(id);
  }
}