import { IRemoveTaskUseCase } from "./IRemoveTaskUseCase.js";
import { IRemoveTaskRepository } from "../../../domain/repositories/Task.repository.js";
import { Task } from "../../../domain/entities/Task.js";
import { RemoveTaskRepository } from "../../../infra/impl/repositories/Task.repository.js";

export class RemoveTaskUseCase implements IRemoveTaskUseCase {
  private removeTaskRepository: IRemoveTaskRepository;

  constructor(removeTaskRepository: RemoveTaskRepository) {
    this.removeTaskRepository = removeTaskRepository;
  }

  async execute(id: number): Promise<Task> {
    return await this.removeTaskRepository.execute(id);
  }
}