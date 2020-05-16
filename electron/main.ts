'use strict'
import { app, BrowserWindow, Menu, shell, clipboard } from 'electron'
import { platform } from 'os'
import windowStateKeeper from 'electron-window-state'

const isProd = app.isPackaged

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 850,
    defaultHeight: 620,
  })

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 600,
    minHeight: 400,
    width: mainWindowState.width,
    height: mainWindowState.height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (getPlatform() === 'mac') {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate as any))
  } else {
    Menu.setApplicationMenu(null)
  }

  win.webContents.on('context-menu', (event, props) => {
    const menuTemplate = []

    if (props.isEditable) {
      menuTemplate.push(
        { label: 'Undo', role: 'undo', enabled: props.editFlags.canUndo },
        { label: 'Redo', role: 'redo', enabled: props.editFlags.canRedo },
        { type: 'separator' },
        { label: 'Cut', role: 'cut', enabled: props.editFlags.canCut },
        { label: 'Copy', role: 'copy', enabled: props.editFlags.canCopy },
        { label: 'Paste', role: 'paste', enabled: props.editFlags.canPaste },
        { type: 'separator' },
        { label: 'Delete', role: 'delete', enabled: props.editFlags.canDelete },
        {
          label: 'Select all',
          role: 'selectall',
          enabled: props.editFlags.canSelectAll,
        }
      )
    }

    if (props.linkURL) {
      menuTemplate.push(
        {
          label: 'Open link',
          click() {
            shell.openExternal(props.linkURL)
          },
        },
        {
          label: 'Copy link location',
          click() {
            clipboard.writeText(props.linkURL)
          },
        }
      )
    }

    if (menuTemplate.length > 0) {
      Menu.buildFromTemplate(menuTemplate as any).popup(win as any)
    }
  })

  win.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  })

  win.once('ready-to-show', () => {
    mainWindowState.manage(win)
    win.show()
    win.focus()
  })

  win.loadURL('http://localhost:4200')

  if (!isProd) {
    win.webContents.openDevTools()
  }
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

const getPlatform = () => {
  switch (platform()) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      return 'linux'
    case 'darwin':
    case 'sunos':
      return 'mac'
    case 'win32':
      return 'win'
  }
}

const menuTemplate = [
  {
    label: app.name,
    submenu: [
      {
        label: 'About Application',
        selector: 'orderFrontStandardAboutPanel:',
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
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
