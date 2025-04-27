export default class RemoveTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(id) {
    return this.taskRepository.remove(id);
  }
}