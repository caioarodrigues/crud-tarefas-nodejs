import { TaskDTO } from "../DTOs/TaskDTO";
import { SetTaskDoneUseCase } from "../usecases/SetTaskDone/SetTaskDoneUseCase";
import { SetTaskDoneRepository } from "@/infra/impl/repositories/Task.repository";
import { dbFileFormat, dbFileName } from "@/domain/constants/files";
import { createFile, removeFile } from "@/app/utils/FileOperations";
import { ListTaskService } from "./ListTask.service";

export class SetTaskDoneService {
  private setTaskDoneUseCase: SetTaskDoneUseCase;
  private listTaskService: ListTaskService;

  constructor() {
    this.setTaskDoneUseCase = new SetTaskDoneUseCase(new SetTaskDoneRepository());
    this.listTaskService = new ListTaskService();
  }

  async execute(id: number): Promise<TaskDTO | null> {
    const task = await this.setTaskDoneUseCase.setDone(id);
    const { tasks } = await this.listTaskService.listAll();

    removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify({ tasks }) });

    return task;
  }
}