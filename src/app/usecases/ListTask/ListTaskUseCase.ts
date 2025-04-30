import { IListTaskUseCase } from "@/app/usecases/ListTask/IListTaskUseCase";
import { ListTaskDTO } from "./ListTaskDTO";
import { IListTaskRepository } from "../../../domain/repositories/Task.repository";

export class ListTaskUseCase implements IListTaskUseCase {
  private listTaskRepository: IListTaskRepository;

  constructor(listTaskRepository: IListTaskRepository) {
    this.listTaskRepository = listTaskRepository;
  }

  async execute(): Promise<ListTaskDTO[]> {
    const tasks = await this.listTaskRepository.execute();

    return tasks;
  }
}