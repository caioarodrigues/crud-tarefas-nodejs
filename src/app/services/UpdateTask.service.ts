import { UpdateTaskUseCase } from "../usecases/UpdateTask/UpdateTaskUseCase";
import { UpdateTaskRepository } from "@/infra/impl/repositories/Task.repository";
import { TaskDTO } from "../DTOs/TaskDTO";
import { createFile, removeFile } from "../utils/FileOperations";
import { dbFileFormat, dbFileName } from "@/domain/constants/files";
import { ListTaskService } from "./ListTask.service";

export class UpdateTaskService {
  private updateTaskUseCase: UpdateTaskUseCase;
  private listTaskService: ListTaskService;

  constructor() {
    this.updateTaskUseCase = new UpdateTaskUseCase(new UpdateTaskRepository());
    this.listTaskService = new ListTaskService();
  }

  async execute(task: Pick<TaskDTO, "id" | "title" | "description" | "status">): Promise<TaskDTO> {
    const updatedTask = await this.updateTaskUseCase.execute(task);
    const { tasks } = await this.listTaskService.listAll();

    removeFile({ fileFormat: dbFileFormat, fileName: dbFileName });
    createFile({ fileFormat: dbFileFormat, fileName: dbFileName, content: JSON.stringify({ tasks }) });

    return updatedTask;
  }
}