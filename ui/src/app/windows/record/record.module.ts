import { NgModule } from '@angular/core'
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
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  declarations: [RecordComponent],
})
export class RecordModule {}
