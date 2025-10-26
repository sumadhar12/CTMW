import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create task
  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  // Get all tasks (with filters)
  @Get()
  async getTasks(
    @Query('status') status?: string,
    @Query('assigneeId') assigneeId?: number,
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.getTasks({ status, assigneeId, priority });
  }

  // Update task
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  // Delete task
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
