import { Component, OnInit } from '@angular/core'
import { IpcService } from 'src/app/ipc.service'

const electron = (window as any).require('electron')
const ipc = electron.ipcRenderer

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  constructor(private readonly _ipc: IpcService) {}

  ngOnInit(): void {}

  handleSaveVideoClick() {
    this._ipc.send('createUserDataWindow')
  }
}
