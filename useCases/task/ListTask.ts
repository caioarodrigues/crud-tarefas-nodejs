export default class ListTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute() {
    return this.taskRepository.list();
  }
}