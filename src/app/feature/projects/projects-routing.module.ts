import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './component/project-list/project-list.component';

const subRoutes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    data: { pageTitle: 'Project list' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(subRoutes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
