// src/modules/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  assigneeId?: number;

  @IsOptional()
  @IsInt()
  projectId?: number;

  @IsOptional()
  priority?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  dueDate?: Date;
}
