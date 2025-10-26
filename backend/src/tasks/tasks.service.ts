import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const { title, description, projectId, assigneeId } = dto;

    const project = await this.projectsRepository.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    let assignee: User | undefined = undefined;
    if (assigneeId) {
      const foundUser = await this.usersRepository.findOne({ where: { id: assigneeId } });
      if (!foundUser) throw new NotFoundException('Assigned user not found');
      assignee = foundUser;
    }

    const task = this.tasksRepository.create({
      title,
      description,
      project,
      assignee,
    });

    return await this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({ relations: ['project', 'assignee'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['project', 'assignee'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return await this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.create(dto);
  }

  async getTasks(filters: { status?: string; assigneeId?: number; priority?: string }): Promise<Task[]> {
    const query = this.tasksRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.assignee', 'assignee');

    if (filters.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }
    if (filters.assigneeId) {
      query.andWhere('task.assignee.id = :assigneeId', { assigneeId: filters.assigneeId });
    }
    if (filters.priority) {
      query.andWhere('task.priority = :priority', { priority: filters.priority });
    }

    return await query.getMany();
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    return this.update(id, dto);
  }

  async deleteTask(id: number): Promise<void> {
    return this.remove(id);
  }
}
