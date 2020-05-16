import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared.module'

import { RecordComponent } from './record.component'

const routes: Routes = [
  {
    path: '',
    component: RecordComponent,
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  declarations: [RecordComponent],
})
export class RecordModule {}
