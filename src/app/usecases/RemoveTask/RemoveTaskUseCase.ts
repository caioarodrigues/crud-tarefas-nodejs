import { IRemoveTaskUseCase } from "./IRemoveTaskUseCase";
import { IRemoveTaskRepository } from "../../../domain/repositories/Task.repository";
import { Task } from "../../../domain/entities/Task";
import { RemoveTaskRepository } from "../../../infra/impl/repositories/Task.repository";

export class RemoveTaskUseCase implements IRemoveTaskUseCase {
  private removeTaskRepository: IRemoveTaskRepository;

  constructor(removeTaskRepository: RemoveTaskRepository) {
    this.removeTaskRepository = removeTaskRepository;
  }

  async execute(id: number): Promise<Task> {
    return this.removeTaskRepository.execute(id);
  }
}