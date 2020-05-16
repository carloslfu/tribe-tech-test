import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
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

  @ViewChild('video') videoElm: ElementRef<HTMLVideoElement>

  constructor(
    private _fireStorage: AngularFireStorage,
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
    this.mediaRecorder.stream.getTracks().forEach((track) => {
      track.stop()
    })
    this.state = 'stopped'
  }

  save() {
    chunksToDataUrl(this.chunks, (dataUrl) => {
      const file = dataUrlToFile(dataUrl)
      const fileId = uuidV4()
      this._fireStorage
        .ref(`videos/${fileId}.webm`)
        .put(file)
        .then(() => {
          this._ipc.send('videoUploaded')
        })
        .catch((err) => {
          alert(
            'error while uploading the file to the server: ' +
              JSON.stringify(err)
          )
          this.cancel()
        })
    })
  }

  cancel() {
    this.chunks = []
    this.mediaRecorder = undefined
  }

  initRecord() {
    this.chunks = []
    if (navigator.mediaDevices) {
      var constraints = { audio: true, video: true }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream)

          this.videoElm.nativeElement.srcObject = stream
          this.videoElm.nativeElement.onloadedmetadata = (e) => {
            this.videoElm.nativeElement.play()
            this.videoElm.nativeElement.muted = true
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
}

function dataUrlToFile(dataUrl) {
  var binary = atob(dataUrl.split(',')[1]),
    data = []

  for (var i = 0; i < binary.length; i++) data.push(binary.charCodeAt(i))

  return new File([new Uint8Array(data)], 'recorded-video.webm', {
    type: 'video/webm',
  })
}

function chunksToDataUrl(chunks, callback) {
  var blob = new Blob(chunks, {
    type: 'video/webm',
  })

  var reader = new FileReader()
  reader.onload = () => {
    callback(reader.result)
  }
  reader.readAsDataURL(blob)
}
