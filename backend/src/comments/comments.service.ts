import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const { text, taskId, userId } = dto;
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const comment = this.commentsRepository.create({ text, task, user });
    return await this.commentsRepository.save(comment);
  }

  async findAllByTask(taskId: number): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { task: { id: taskId } },
      relations: ['task', 'user'],
    });
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    return this.create(dto);
  }

  async getCommentsForTask(taskId: number): Promise<Comment[]> {
    return this.findAllByTask(taskId);
  }
}
