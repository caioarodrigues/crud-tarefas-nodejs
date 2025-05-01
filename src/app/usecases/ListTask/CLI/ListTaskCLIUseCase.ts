import { IListTaskCLIUseCase } from "./IListTaskCLIUseCase";
import { IListTaskRepository } from "@/domain/repositories/Task.repository";

export class ListTaskCLIUseCase implements IListTaskCLIUseCase {
  constructor(private listTaskRepository: IListTaskRepository) { }

  async execute(): Promise<void> {
    const tasks = await this.listTaskRepository.execute()
    
    console.log("Listing tasks...");
    console.log(tasks)
  }
}