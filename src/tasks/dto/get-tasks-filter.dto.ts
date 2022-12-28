import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
  @IsOptional()
  @IsString()
  search: string;
}
