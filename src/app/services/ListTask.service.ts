import { IListTaskRepository } from "@/domain/repositories/Task.repository";
import { ListTaskUseCase } from "../usecases/ListTask/ListTaskUseCase";
import { IListTaskUseCase } from "../usecases/ListTask/IListTaskUseCase";

export class ListTaskService {
  private listTaskUseCase: IListTaskUseCase;
  constructor(private listTaskRepository: IListTaskRepository) {
    this.listTaskUseCase = new ListTaskUseCase(listTaskRepository);
  }

  async listAll(): Promise<void> {
    const result = await this.listTaskUseCase.execute();

    console.log("\n[ListTaskService] Tasks:");
    console.log(result.tasks);
  }
}