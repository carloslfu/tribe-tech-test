import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { IpcService } from 'src/app/ipc.service'

const electron = (window as any).require('electron')
const ipc = electron.ipcRenderer

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  constructor(
    private readonly _ipc: IpcService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this._ipc.on('videoUploaded', () => {
      this._message.success('Video saved successfully')
    })
  }

  handleSaveVideoClick() {
    this._ipc.send('createUserDataWindow')
  }
}
