import Task from "../../models/Task.model.js";

export default class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(title, description, status) {
    const task = new Task(title, description, status);
    return this.taskRepository.create(task);
  }
}