import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { IpcService } from 'src/app/ipc.service'

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.less'],
})
export class UserDataComponent implements OnInit {
  formGroup: FormGroup

  constructor(private _fb: FormBuilder, private _ipc: IpcService) {}

  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty()
      this.formGroup.controls[i].updateValueAndValidity()
    }

    if (!this.formGroup.invalid) {
      this._ipc.send('userDataSubmitted', this.formGroup.value)
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault()
  }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    })
  }
}
