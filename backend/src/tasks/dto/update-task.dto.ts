import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  assigneeId?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'] as const, { message: 'priority must be low|medium|high' })
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsEnum(['open', 'in_progress', 'done'] as const, { message: 'status must be open|in_progress|done' })
  status?: 'open' | 'in_progress' | 'done';
}
