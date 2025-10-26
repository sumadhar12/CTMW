import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create new project
  @Post()
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  // Get all projects
  @Get()
  async getAllProjects() {
    return this.projectsService.findAll();
  }

  // Update project
  @Patch(':id')
  async updateProject(@Param('id') id: number, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  // Delete project
  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
}
