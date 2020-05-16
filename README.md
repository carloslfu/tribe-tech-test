# Tribe Technical Test Solution

> :warning: Warning: this is a repository for a technical test I am doing for a company. It is NOT intended for public use!

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

## Notes on security!

This MVP do not have authentication, so all the users can read and write to the Firebase Backend services.

## Development

TODO.

## Production build

TODO.

## Releases

Binaries for Windows 64 bits and MacOS 64 bits will be available

# Roadmap

- [x] System design and architecture, tech choices
- [x] Document architecture
- [x] Implement initial Electron setup
- [x] Implement UI setup
- [x] Complete roadmap
- [x] Integrate Firebase on UI
- [ ] Implement Main window with:
  - [ ] A Menu with "Save Video Message" and "Quit" options.
  - [ ] A big "Save Video Message" button.
- [ ] Implement User Data Window (second window):
  - [ ] Link "Save Video Message" action (menu and button) to the User Data Window creation.
  - [ ] Create a form with name and email fields, and a "send" button.
- [ ] Implement the Record Window (third window):
  - [ ] Link "Send" button in the User Data Window to the Record Window creation.
  - [ ] Implement video recording.
- [ ] Implement video save:
  - [ ] The user save the video with a "Save" button on the Record Window and it should be uploaded to Firebase Storage.
  - [ ] When a video is uploaded to firebase storage it metadata should be saved on Firebase Realtime Database. Metadata: user name, user email, video link.
- [ ] Implement a video list on the Main Window:
  - [ ] Implement list.
  - [ ] Implement Firebase Realtime DB subscription.
  - [ ] Implement download video functionality.
- [ ] Create Windows 64-bit binary and publish it on Github Deployments
- [ ] Create MacOS 64-bit binary and publish it on Github Deployments
