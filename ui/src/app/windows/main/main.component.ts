import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { IpcService } from 'src/app/ipc.service'
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs'
import { AngularFireStorage } from '@angular/fire/storage'

const electron = (window as any).require('electron')
const ipc = electron.ipcRenderer

interface Video {
  id: string
  name: string
  email: string
  path: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  videosList$: Observable<Video[]>

  constructor(
    private readonly _ipc: IpcService,
    private _fireDB: AngularFireDatabase,
    private _fireStorage: AngularFireStorage,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this._ipc.on('videoUploaded', () => {
      this._message.success('Video saved successfully')
    })

    this.videosList$ = this._fireDB.list<Video>('videos').valueChanges()
  }

  handleSaveVideoClick() {
    this._ipc.send('createUserDataWindow')
  }

  handleDownloadVideo(video: Video) {
    this._fireStorage
      .ref(video.path)
      .getDownloadURL()
      .subscribe((videoURL) => {
        this._ipc
          .invoke('downloadFile', `${video.name}.webm`, videoURL)
          .then((result) => {
            if (result === 'success') {
              this._message.success(
                `"${video.name}" video downloaded to the downloads folder successfully`
              )
            }
          })
      })
  }

  handleDeleteVideo(video: Video) {
    this._fireDB
      .object(video.id)
      .remove()
      .then(() => {
        this._fireStorage.ref(video.path).delete()
      })
  }
}
