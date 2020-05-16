import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { en_US } from 'ng-zorro-antd/i18n'

import { AntdModule } from './antd.module'

@NgModule({
  exports: [AntdModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class SharedModule {}
