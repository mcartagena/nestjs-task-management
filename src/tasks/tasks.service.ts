import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task> {
    const found = this.tasksRepository.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
    return this.getTaskById(id).then((task) => {
      return this.tasksRepository.updateTaskStatus(task, taskStatus);
    });
  }
}
