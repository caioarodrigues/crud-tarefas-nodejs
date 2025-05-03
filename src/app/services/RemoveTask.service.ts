import { RemoveTaskRepository } from "@/infra/impl/repositories/Task.repository";
import { RemoveTaskUseCase } from "../usecases/RemoveTask/RemoveTaskUseCase";
import { TaskDTO } from "../DTOs/TaskDTO";
import { IRemoveTaskUseCase } from "../usecases/RemoveTask/IRemoveTaskUseCase";
import { dbFileFormat, dbFileName } from "@/domain/constants/files";
import { verifyExistenceOfFile, createFile, removeFile } from "@/app/utils/FileOperations";
import { ListTaskService } from "./ListTask.service";

export class RemoveTaskService {
  private removeTaskUseCase: IRemoveTaskUseCase;
  private listTaskService: ListTaskService;

  constructor() {
    this.removeTaskUseCase = new RemoveTaskUseCase(new RemoveTaskRepository());
    this.listTaskService = new ListTaskService();
  }

  async execute(id: number): Promise<TaskDTO | null> {
    const taskRemoved = await this.removeTaskUseCase.execute(id);

    if (!taskRemoved) {
      console.log("Task not found");
      return null;
    }

    if (!await verifyExistenceOfFile({ fileFormat: dbFileFormat, fileName: dbFileName })) {
      console.log("DB File not found");
      return null;
    }

    const { tasks } = await this.listTaskService.listAll();

    removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify({ tasks }) });

    return taskRemoved;
  }
}