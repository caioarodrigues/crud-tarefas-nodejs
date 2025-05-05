import { IGetTasksCountUseCase } from "./IGetTaskCountUseCase";
import { IGetTaskCountRepository } from "@/domain/repositories/Task.repository";

export class GetTaskCountUseCase implements IGetTasksCountUseCase {
  constructor(private getTaskCountRepository: IGetTaskCountRepository) {}

  async getCount(): Promise<number> {
    return this.getTaskCountRepository.execute();
  }
}