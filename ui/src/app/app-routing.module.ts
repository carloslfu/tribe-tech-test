import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./windows/main/main.module').then((m) => m.MainModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
