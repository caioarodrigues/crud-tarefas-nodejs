import { FilterTaskByKeywordRepository } from "@/infra/impl/repositories/Task.repository";
import { FilterByKeywordUseCase } from "../usecases/FilterByKeyWord/FilterByKeyWord";
import { ListTaskDTO } from "../DTOs/ListTaskDTO";

export class FilterTaskByKeywordService {
  private filterByKeywordUseCase: FilterByKeywordUseCase;

  constructor() {
    this.filterByKeywordUseCase = new FilterByKeywordUseCase(
      new FilterTaskByKeywordRepository()
    );
  }

  async execute(keyword: string): Promise<ListTaskDTO> {
    const tasks = await this.filterByKeywordUseCase.filterByKeyword(keyword);
    return tasks;
  }
}