'use strict'

const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function onPomodoroFinished (event) {
}

function onAppReady () {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    resizable: false,
    icon: path.join(__dirname, 'img', 'tomato.png'),
    webPreferences: {
      nodeIntegration: true,
        preload: path.join(__dirname, 'js', 'preload.js')
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'html', 'index.html'));

  ipcMain.on('pomodoro-finished', onPomodoroFinished);
}

app.whenReady().then(onAppReady)

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
