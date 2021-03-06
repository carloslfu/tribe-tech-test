# Tribe Technical Test Solution

> :warning: Warning: this is a repository for a technical test I am doing for a company. It is NOT intended for public use!

![app screenshot](app-screenshot.png)

The test specs are [here](Test.md), and the roadmap is at the end of this document.

## Architecture

The system components are:

- Client Side (Desktop app)
  - Main process (`electron/` folder): Electron files for the main process. It uses TypeScript and is bundled using Parcel.
  - Renderer processes (`ui/` folder): UI built with Angular 9, with routes to support the different Electron windows. The UI uses [Ant Design components for Angular](https://ng.ant.design/).
- Server Side (Firebase)
  - Firebase Storage: used to save the video files.
  - Firebase Realtime DB: used to save video metadata and notify about its changes.

Architecture Diagram, made using [asciiflow](http://asciiflow.com/):

```
   +------------------------------------+      +-------------------------------+
   | Client Side (Electron desktop app) |      | Server Side (Firebase)        |
   |                                    |      |                               |
   |  +-------------------------+       |      |   +----------------------+    |
   |  | Renderer processes (UI) +<---------------->+ Firebase Realtime DB |    |
   |  +-------------------------+       |      |   +----------------------+    |
   |          |   ^          ^          |      |                               |
   |          v   |          |          |      |   +----------------------+    |
   |  +--------------+       +-------------------->+ Firebase Storage     |    |
   |  | Main process |                  |      |   +----------------------+    |
   |  +--------------+                  |      |                               |
   |                                    |      |                               |
   +------------------------------------+      +-------------------------------+
```

## UI/UX improvements

I made some additions to improve UX:

- User selection is disabled by default on the UI, it is what you expect from a native app.
- In order to support MacOSX cut/copy/paste, and more editing commands, those commands are added to the Electron Menu.
- Keep Main Window state using the `electron-window-state` package.
- The UI uses [Ant Design components for Angular](https://ng.ant.design/).
- Show the Electron windows only when they are ready. It is implemented by using the Electron BrowserWindow `ready-to-show` event.
- The Menu "Save Video Message" option is implemented a big button on the main window, because it is the main user action on that window.
- Video recording preview and cancel functionality.

## Notes on security!

This MVP do not have authentication, so all the users can read and write to the Firebase Backend services.

## Development

- Open a terminal on the `ui/` folder and run: `npm start`
- Open a terminal on the `electron/` folder and run: `npm start`

## Production build

- Open a terminal on the `ui/` folder and run: `npm run build`
- Rename the `ui/dist/ui` folder to `ui/dist/dist-renderer`
- Copy the `ui/dist/dist-renderer` folder to `electron/dist-renderer`
- Open a terminal on the `electron/` folder and run: `npm run build`

## UI notes

There is an issue with lazy components that do not load parent dependencies, see [this issue](https://github.com/angular/angular/issues/36193). For this reason each lazy module imports the Ant Design Module.

## Releases

Binaries for MacOS 64-bits, and Windows 64-bits are available on the Github Releases page.

## Known issues

The MP4 format of the recorded video is only openable with a browser (Chrome preferred) in some systems, it is possibly because of the file format. This issue is easily fixable, and it will be fixed on future releases.

## Roadmap

- [x] System design and architecture, tech choices
- [x] Document architecture
- [x] Implement initial Electron setup
- [x] Implement UI setup
- [x] Complete roadmap
- [x] Integrate Firebase on UI
- [x] Implement Main window:
  - [x] Create main window
  - [x] A Menu with "Save Video Message" and "Quit" options
  - [x] A "Save Video Message" button
- [x] Implement User Data Window (second window):
  - [x] Create User Data Window
  - [x] Link "Save Video Message" action (menu and button) to the User Data Window creation
  - [x] Create a form with name and email fields, and a "send" button
- [x] Implement the Record Window (third window):
  - [x] Create Record Window
  - [x] Link "Send" button in the User Data Window to the Record Window creation
  - [x] Implement video recording
- [x] Implement video save:
  - [x] The user save the video with a "Save" button on the Record Window and it should be uploaded to Firebase Storage, and close the Record Window
  - [x] When a video is uploaded the Main Window should show a notification message
  - [x] When a video is uploaded to Firebase storage its metadata should be saved on Firebase Realtime Database. Metadata: user name, user email, and video link.
- [x] Implement a video list on the Main Window:
  - [x] Implement video list
  - [x] Implement Firebase Realtime DB subscription
  - [x] Implement download video functionality
  - [x] Implement delete video functionality
- [x] Configure production build
- [x] Create Windows 64-bit binary and publish it on Github Deployments
- [x] Create MacOS 64-bit binary and publish it on Github Deployments
