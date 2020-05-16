# Technical Test Full-Stack Engineering Tribe.

At Tribe we are asking you to build a MVP based on Electron/Angular. This MVP must be well structured and coded. This is the workflow for that MVP:

- Main window with a menu (Electron’s menu) with 2 options:
  - Save Video Message
  - Quit
- A second window (Electron window) is opened when clicking the “Save Video Message” link. In this window the user is asked to enter his name and email. There must be a button to “send” this info.
- A third window (Electron window) is opened when clicking the “Send” button in the second window. In this window the user will be able to record a Video Message using MediaRecorder API which is a browser native API supported for many browsers including Chrome. Here is a basic web where you can find all you need in order to implement this task (https://simpl.info/mediarecorder/)
- After saving the Video Message, the user will be able to save that file in the Electron local storage and a link will be displayed in the main window to download that file.
  The Main window should have a message so the user knows that there’s a new Video Message recorded. A button to download the video message should be next to the message.

## Requirements:

- It must be implemented using Angular 8 or Angular 9.
- The windows mentioned in the tasks must be Electron WINDOWS not dom windows.

## To evaluate the technical test we need:

- The code in a public repository like GitHub. Please make sure to make as many commits as you need in order to show the implementation workflow.
- Please add a block diagram to represent the architecture.
- A Readme file.

## Remember:

- This test is to be done within 24 hrs so you must plan your work.
- We will focus on testing how you organize the code and the structure of the architecture.

## If you have time enough, it will be nice if:

- Use firebase storage to upload/download the video message file.
- Notify the main window of a new video using firebase realtime db events.
- Profile the application.
