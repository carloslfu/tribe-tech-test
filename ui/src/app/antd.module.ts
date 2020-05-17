import { NgModule } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzListModule } from 'ng-zorro-antd/list'

@NgModule({
  exports: [
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzMessageModule,
    NzListModule,
  ],
})
export class AntdModule {}
