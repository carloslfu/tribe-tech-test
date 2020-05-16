import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AntdModule } from '../../antd.module'

import { MainComponent } from './main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), AntdModule],
  exports: [RouterModule],
  declarations: [MainComponent],
})
export class MainModule {}
