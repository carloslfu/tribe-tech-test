import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireDatabase } from '@angular/fire/database'
import { v4 as uuidV4 } from 'uuid'
import { IpcService } from 'src/app/ipc.service'

// installing @types/dom-mediacapture-record did not worked, TODO: we should investigate
declare var MediaRecorder: any

type RecordState = 'initial' | 'recording' | 'paused' | 'stopped'

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  state: RecordState = 'initial'
  chunks = []
  mediaRecorder: any
  recordingUrl = ''

  @ViewChild('video') videoElm: ElementRef<HTMLVideoElement>

  constructor(
    private _fireStorage: AngularFireStorage,
    private _fireDB: AngularFireDatabase,
    private _ipc: IpcService
  ) {}

  ngOnInit(): void {
    this.initRecord()
  }

  record() {
    this.mediaRecorder.start()
    this.state = 'recording'
  }

  pause() {
    this.mediaRecorder.pause()
    this.state = 'paused'
  }

  resume() {
    this.mediaRecorder.resume()
    this.state = 'recording'
  }

  stop() {
    this.mediaRecorder.stop()
    this.state = 'stopped'

    setTimeout(() => {
      chunksToDataUrl(this.chunks, (dataUrl) => {
        this.videoElm.nativeElement.muted = false
        this.recordingUrl = dataUrl
        this.videoElm.nativeElement.srcObject = null
        this.videoElm.nativeElement.src = dataUrl
        this.videoElm.nativeElement.controls = true
      })
    })
  }

  save() {
    const file = dataUrlToFile(this.recordingUrl)
    const videoId = uuidV4()
    const path = `videos/${videoId}.mp4`

    this._fireStorage
      .ref(path)
      .put(file)
      .then(() => this.saveVideoMetadata(videoId, path))
      .then(() => {
        this._ipc.send('videoUploaded')
      })
      .catch((err) => {
        alert(
          'error while uploading the file to the server: ' + JSON.stringify(err)
        )
        this.cancel()
      })
  }

  cancel() {
    this.chunks = []
    this.mediaRecorder = undefined
    this.state = 'initial'
    this.initRecord()
  }

  initRecord() {
    if (navigator.mediaDevices) {
      var constraints = { audio: true, video: true }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream)

          this.videoElm.nativeElement.muted = true
          this.videoElm.nativeElement.srcObject = stream
          this.videoElm.nativeElement.onloadedmetadata = (e) => {
            this.videoElm.nativeElement.play()
          }

          this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data)
          }
        })
        .catch((err) => {
          console.log('The following error occurred: ' + err)
        })
    }
  }

  async saveVideoMetadata(videoId: string, path: string) {
    const userData = await this._ipc.invoke('getUserData')

    await this._fireDB.object(`videos/${videoId}`).set({
      id: videoId,
      name: userData.name,
      email: userData.email,
      path,
    })
  }
}

function dataUrlToFile(dataUrl) {
  var binary = atob(dataUrl.split(',')[1]),
    data = []

  for (var i = 0; i < binary.length; i++) data.push(binary.charCodeAt(i))

  return new File([new Uint8Array(data)], 'recorded-video.mp4', {
    type: 'video/mp4',
  })
}

function chunksToDataUrl(chunks, callback) {
  var blob = new Blob(chunks, {
    type: 'video/mp4',
  })

  var reader = new FileReader()
  reader.onload = () => {
    callback(reader.result)
  }
  reader.readAsDataURL(blob)
}
