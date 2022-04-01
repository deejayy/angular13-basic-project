import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './page/projects/projects.component';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
