import CreateTaskUseCase from "../useCases/task/CreateTask.ts";
import ListTaskUseCase from "../useCases/task/ListTask.ts";
import RemoveTaskUseCase from "../useCases/task/RemoveTask.ts";

export default class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;

    this.createTaskUseCase = new CreateTaskUseCase(this.taskRepository);
    this.deleteTaskUseCase = new RemoveTaskUseCase(this.taskRepository);
    this.listTaskUseCase = new ListTaskUseCase(this.taskRepository);
  }

  createTask(title, description, status) {
    return this.createTaskUseCase.execute(title, description, status);
  }

  deleteTask(id) {
    return this.deleteTaskUseCase.execute(id);
  }

  listTasks() {
    return this.listTaskUseCase.execute();
  }
}
