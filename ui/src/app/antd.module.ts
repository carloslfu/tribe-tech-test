import { NgModule } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzFormModule } from 'ng-zorro-antd/form'

@NgModule({
  exports: [NzButtonModule, NzGridModule, NzFormModule],
})
export class AntdModule {}
