import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared.module'

import { UserDataComponent } from './user-data.component'

const routes: Routes = [
  {
    path: '',
    component: UserDataComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  declarations: [UserDataComponent],
})
export class UserDataModule {}
