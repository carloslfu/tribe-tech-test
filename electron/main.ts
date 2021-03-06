'use strict'
import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import windowStateKeeper from 'electron-window-state'
import { download } from 'electron-dl'
import * as path from 'path'
import * as url from 'url'

import { createMenuTemplate } from './menuTemplate'

const isProd = app.isPackaged

const baseURL = isProd
  ? url.format({
      pathname: path.join(__dirname, `../dist-renderer/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  : 'http://localhost:4200'

let mainWindow: BrowserWindow | undefined
let userDataWindow: BrowserWindow | undefined
let recordWindow: BrowserWindow | undefined

function createMainWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 650,
    defaultHeight: 560,
  })

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 600,
    minHeight: 500,
    width: mainWindowState.width,
    height: mainWindowState.height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const menu = Menu.buildFromTemplate(
    createMenuTemplate({
      onSaveVideoMsg: () => {
        if (mainWindow) {
          createMainWindow()
        }
        createUserDataWindow()
      },
    }) as any
  )

  // on MacOS, there is a global menu, and on Windows there is a menu on the mainWindow only
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu)
  } else {
    mainWindow.setMenu(menu)
  }

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindowState.manage(mainWindow)
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.loadURL(baseURL)

  if (!isProd) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    if (process.platform === 'darwin') {
      if (userDataWindow) {
        userDataWindow.close()
      }
      if (recordWindow) {
        recordWindow.close()
      }
    } else {
      app.quit()
    }
  })
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

function createUserDataWindow() {
  const mainWindowBounds = mainWindow!.getBounds()

  userDataWindow = new BrowserWindow({
    x: mainWindowBounds.x + 100,
    y: mainWindowBounds.y + 60,
    minWidth: 578,
    minHeight: 400,
    width: 600,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  userDataWindow.setMenu(null)

  userDataWindow.loadURL(`${baseURL}#user-data`)

  userDataWindow.once('ready-to-show', () => {
    if (userDataWindow) {
      userDataWindow.show()
      userDataWindow.focus()
    }
  })

  userDataWindow.on('closed', () => {
    userDataWindow = undefined
  })
}

function createRecordWindow() {
  const mainWindowBounds = mainWindow!.getBounds()

  recordWindow = new BrowserWindow({
    x: mainWindowBounds.x + 100,
    y: mainWindowBounds.y + 60,
    minWidth: 578,
    minHeight: 500,
    width: 600,
    height: 500,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  recordWindow.setMenu(null)

  recordWindow.loadURL(`${baseURL}#record`)

  recordWindow.once('ready-to-show', () => {
    if (recordWindow) {
      recordWindow.show()
      recordWindow.focus()
    }
  })

  recordWindow.on('closed', () => {
    recordWindow = undefined
  })
}

ipcMain.on('createUserDataWindow', () => {
  createUserDataWindow()
})

let userData: { name: string; email: string }

ipcMain.on('userDataSubmitted', (_, newUserData) => {
  userData = newUserData
  if (userDataWindow) {
    userDataWindow.close()
  }
  createRecordWindow()
})

ipcMain.handle('getUserData', async () => {
  return userData
})

ipcMain.on('videoUploaded', () => {
  if (recordWindow) {
    recordWindow.close()
  }
  if (mainWindow) {
    mainWindow.webContents.send('videoUploaded')
  }
})

ipcMain.handle('downloadFile', async (event, filename, url) => {
  if (!mainWindow) {
    return
  }
  try {
    await download(mainWindow, url, { filename })
  } catch (err) {
    console.log(err)
    return
  }

  return 'success'
})
