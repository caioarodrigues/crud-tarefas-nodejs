import { ListTaskDTO } from "@/app/DTOs/ListTaskDTO";
import { IFilterByKeyWord } from "./IFilterByKeyWord";
import { IFilterTaskByKeywordRepository } from "@/domain/repositories/Task.repository";

export class FilterByKeywordUseCase implements IFilterByKeyWord {
  constructor(private filterTaskByKeywordRepository: IFilterTaskByKeywordRepository) {}

  async filterByKeyword(keyword: string): Promise<ListTaskDTO> {
    return await this.filterTaskByKeywordRepository.execute(keyword);
  }
}