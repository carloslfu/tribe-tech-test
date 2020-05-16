import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./windows/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'user-data',
    loadChildren: () =>
      import('./windows/user-data/user-data.module').then(
        (m) => m.UserDataModule
      ),
  },
  {
    path: 'record',
    loadChildren: () =>
      import('./windows/record/record.module').then((m) => m.RecordModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
