import { Task } from './task.entity';
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.findOneBy({ id: id });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.delete({ id: id });

    if(result.affected === 0){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
