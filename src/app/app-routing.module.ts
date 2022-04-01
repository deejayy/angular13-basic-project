import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PROJECTS_ROUTES } from './feature/projects/projects-routing-parent';

const routes: Routes = [...PROJECTS_ROUTES];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
