import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { en_US } from 'ng-zorro-antd/i18n'

import { AntdModule } from './antd.module'
import { CommonModule } from '@angular/common'

@NgModule({
  exports: [
    AntdModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class SharedModule {}
