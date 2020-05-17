import { NgModule } from '@angular/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzIconModule } from 'ng-zorro-antd/icon'

@NgModule({
  exports: [
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzMessageModule,
    NzListModule,
    NzIconModule,
  ],
})
export class AntdModule {}
