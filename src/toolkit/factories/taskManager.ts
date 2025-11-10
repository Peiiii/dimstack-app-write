import { SafeAny } from "@/toolkit/types";

// 定义任务类型
export interface TaskType {
  name: string;
  // 定义其他共享的属性和方法
  execute(taskData?: SafeAny): void | Promise<void>;
}

// 定义任务状态的枚举
export enum TaskStatus {
  Pending = "Pending",
  Deffered = "Deffered",
  InProgress = "InProgress",
  Completed = "Completed",
  Error = "Error", // 新增的错误状态
}

// 创建任务实例
class Task {
  constructor(
    public taskType: TaskType,
    public taskData: any,
    public status: TaskStatus = TaskStatus.Pending
  ) {}

  async execute() {
    this.status = TaskStatus.InProgress;

    try {
      // 执行任务的逻辑
      // ...

      const result = this.taskType.execute(this.taskData);
      if (result instanceof Promise) {
        await result;
      }

      this.status = TaskStatus.Completed;
    } catch (error) {
      this.status = TaskStatus.Error;
      // 可以在这里处理错误，例如记录日志或执行其他错误处理逻辑
      console.error("Task execution error:", error);
    }
  }
}

export class TaskManager {
  // private taskTypes: Map<string, TaskType> = new Map();
  // private taskQueue: Task[] = [];
  // private historyTasks: Task[] = []; // 历史任务队列
  constructor(
    public id: string,
    private taskTypes: Map<string, TaskType> = new Map(),
    private taskQueue: Task[] = [],
    private historyTasks: Task[] = []
  ) {}

  registerTaskType(taskType: TaskType) {
    this.taskTypes.set(taskType.name, taskType);
  }

  addTask(
    taskTypeName: string,
    taskData: any,
    options: { deffered: boolean } = { deffered: false }
  ) {
    if (!this.taskTypes.has(taskTypeName)) {
      throw new Error(`Task type "${taskTypeName}" is not registered.`);
    }
    const task = new Task(
      this.taskTypes.get(taskTypeName)!,
      taskData,
      options.deffered ? TaskStatus.Deffered : TaskStatus.Pending
    );
    this.taskQueue.push(task);
    this.saveTasks();
    setTimeout(() => {
      this.executeTasks();
    });
  }

  private executeTasks() {
    this.taskQueue
      .filter((task) => task.status !== TaskStatus.Deffered)
      .forEach((task) => {
        if (task.status == TaskStatus.Pending) {
          task.execute().then(() => {
            this.archiveTask(task);
          });
        }
      });
  }
  private archiveTask(task: Task): void {
    const index = this.taskQueue.indexOf(task);
    if (index !== -1) {
      this.taskQueue.splice(index, 1);
      this.historyTasks.push(task); // 将任务添加到历史任务队列
    }
    this.saveTasks();
  }

  private continueInterruptedTasks() {
    this.taskQueue.forEach((task) => {
      if (task.status === TaskStatus.InProgress) {
        task.execute().then(() => {
          this.archiveTask(task);
        });
      }
    });
  }

  saveTasks() {
    const serializedTasks = this.serializeTasks();
    localStorage.setItem(this.id, JSON.stringify(serializedTasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem(this.id);
    let parsedTasks = null;
    try {
      parsedTasks = storedTasks ? JSON.parse(storedTasks) : null;
    } catch (error) {
      console.error("Error parsing stored tasks:", error);
    }
    if (parsedTasks) {
      this.deserializeTasks(parsedTasks);
    }
  }

  private serializeTasks() {
    return {
      id: this.id,
      taskQueue: this.taskQueue.map((task) => ({
        taskType: task.taskType.name,
        taskData: task.taskData,
        status: task.status,
      })),
      historyTasks: this.historyTasks.map((task) => ({
        taskType: task.taskType.name,
        taskData: task.taskData,
        status: task.status,
      })),
    };
  }

  private deserializeTasks(serializedData: {
    id: string;
    taskQueue: { taskType: string; taskData: SafeAny; status: TaskStatus }[];
    historyTasks: { taskType: string; taskData: SafeAny; status: TaskStatus }[];
  }) {
    if (serializedData.id !== this.id) {
      throw new Error("Invalid serialized data for this task manager");
    }
    this.taskQueue = serializedData.taskQueue.reduce((queue, taskData) => {
      const taskTypeName = taskData.taskType;
      if (!this.taskTypes.has(taskTypeName)) {
        console.warn(
          `Task type "${taskTypeName}" is not registered. Skipping this task.`
        );
        return queue; // 跳过当前任务，继续加载下一个任务
      }
      const task = new Task(
        this.taskTypes.get(taskTypeName)!,
        taskData.taskData
      );
      task.status = taskData.status;

      if (task.status === TaskStatus.Deffered) {
        task.status = TaskStatus.Pending;
      }
      queue.push(task);
      return queue;
    }, [] as Task[]);

    this.historyTasks = serializedData.historyTasks.reduce(
      (queue, taskData) => {
        const taskTypeName = taskData.taskType;
        if (!this.taskTypes.has(taskTypeName)) {
          console.warn(
            `Task type "${taskTypeName}" is not registered. Skipping this task.`
          );
          return queue; // 跳过当前任务，继续加载下一个任务
        }
        const task = new Task(
          this.taskTypes.get(taskTypeName)!,
          taskData.taskData
        );
        task.status = taskData.status;
        queue.push(task);
        return queue;
      },
      [] as Task[]
    );
  }

  start() {
    window.addEventListener("DOMContentLoaded", () => {
      this.loadTasks();
      this.continueInterruptedTasks();
      this.executeTasks();
    });
  }
}
