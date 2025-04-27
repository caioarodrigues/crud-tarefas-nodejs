export default class TaskRepository {
  constructor() {
    this.tasks = [];
  }

  create(task) {
    this.tasks.push(task);
    return task;
  }

  remove(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }

  list() {
    return this.tasks;
  }
}
