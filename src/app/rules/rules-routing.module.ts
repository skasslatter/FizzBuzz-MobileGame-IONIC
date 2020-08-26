import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulesPage } from './rules.page';

const routes: Routes = [
  {
    path: '',
    component: RulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesPageRoutingModule {}
