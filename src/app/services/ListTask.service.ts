import { ListTaskUseCase } from "../usecases/ListTask/ListTaskUseCase";
import { IListTaskUseCase } from "../usecases/ListTask/IListTaskUseCase";
import { ListTaskRepository } from "@/infra/impl/repositories/Task.repository";

export class ListTaskService {
  private listTaskUseCase: IListTaskUseCase;

  constructor() {
    this.listTaskUseCase = new ListTaskUseCase(new ListTaskRepository());
  }

  async listAll() {
    const result = await this.listTaskUseCase.execute();

    console.log("\n[ListTaskService] Tasks:", result.tasks);
    console.log("\n[ListTaskService] Tasks Count:", result.count);

    return result;
  }
}