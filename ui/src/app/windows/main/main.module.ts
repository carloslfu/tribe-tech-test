import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared.module'

import { MainComponent } from './main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  declarations: [MainComponent],
})
export class MainModule {}
