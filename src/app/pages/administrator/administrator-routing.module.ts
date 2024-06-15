import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorFormComponent } from './administrator-form/administrator-form.component';
import { AdministratorListComponent } from './administrator-list/administrator-list.component';

const routes: Routes = [
  {
    path:'',
    component:AdministratorListComponent
  },
  {
    path:'form',
    component:AdministratorFormComponent
  },
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }

