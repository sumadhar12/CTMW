import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Add a comment to a task
  @Post()
  async addComment(@Body() dto: CreateCommentDto) {
    return this.commentsService.addComment(dto);
  }

  // Get comments for a task
  @Get('task/:taskId')
  async getCommentsForTask(@Param('taskId') taskId: number) {
    return this.commentsService.getCommentsForTask(taskId);
  }
}
