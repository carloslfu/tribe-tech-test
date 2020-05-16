'use strict'
import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import windowStateKeeper from 'electron-window-state'

const isProd = app.isPackaged

let mainWindow: BrowserWindow

function createWindow() {
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

  const menu = Menu.buildFromTemplate(menuTemplate as any)

  // on MacOs, there is a global menu, and on Windows there is a menu on the mainWindow only
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu)
  } else {
    mainWindow.setMenu(menu)
  }

  mainWindow.once('ready-to-show', () => {
    mainWindowState.manage(mainWindow)
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.loadURL('http://localhost:4200')

  if (!isProd) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  ipcMain.on('openUserDataWindow', () => {
    openUserDataWindow()
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const menuTemplate = [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Save Video Message',
        accelerator: 'CmdOrCtrl+M',
        click: function () {
          openUserDataWindow()
        },
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function () {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:',
      },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:',
      },
    ],
  },
]

function openUserDataWindow() {
  const mainWindowBounds = mainWindow.getBounds()

  const userDataWindow = new BrowserWindow({
    x: mainWindowBounds.x + 100,
    y: mainWindowBounds.y + 60,
    minWidth: 400,
    minHeight: 400,
    width: 400,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  userDataWindow.setMenu(null)

  userDataWindow.loadURL('http://localhost:4200/#/user-data')

  userDataWindow.once('ready-to-show', () => {
    userDataWindow.show()
    userDataWindow.focus()
  })
}
