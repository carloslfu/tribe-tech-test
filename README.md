# Tribe Technical Test Solution

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

## UI/UX aditions

I made some additions to improve UX:

- User selection is disabled by default in the UI.
- In order to support MacOSX cut/copy/paste, and more editing commands, those commands are added to the Electron Menu.
- Keep window state using the `electron-window-state` package.
- The UI uses [Ant Design components for Angular](https://ng.ant.design/).

## Development

TODO.

## Production build

TODO.

# Roadmap

- [x] System design and architecture, tech choices
- [x] Document architecture
- [x] Implement initial Electron setup
- [ ] Implement UI setup
- [ ] Complete roadmap
