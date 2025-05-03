import { IListTaskRepository } from "@/domain/repositories/Task.repository";
import { ListTaskUseCase } from "../usecases/ListTask/ListTaskUseCase";
import { IListTaskUseCase } from "../usecases/ListTask/IListTaskUseCase";

export class ListTaskService {
  private listTaskUseCase: IListTaskUseCase;
  constructor(private listTaskRepository: IListTaskRepository) {
    this.listTaskUseCase = new ListTaskUseCase(listTaskRepository);
  }

  async listAll() {
    const result = await this.listTaskUseCase.execute();

    console.log("\n[ListTaskService] Tasks:", result.tasks);
    console.log("\n[ListTaskService] Tasks Count:", result.count);

    return result;
  }
}