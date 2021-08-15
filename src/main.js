const { app, BrowserWindow, ipcMain, Notification, screen } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser mainWindowdow.

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
 

  const mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 200,
    width:width - 500,
    height: height - 200,
    // backgroundColor: '#2e2c29',
    // opacity:0.2,
    // darkTheme:true,
    // titleBarStyle:'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // ipcMain.on('minimize', (_, title, message) => {
  //   console.log("mibnin");
  //   new Notification({ title: title, body: message }).show();
  // })

  ipcMain.on("minimize", () => mainWindow.minimize());

  ipcMain.on("maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      mainWindow.center();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("closeWindow", () => {
    mainWindow.close();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser mainWindowdows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all mainWindowdows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('mainWindowdow-all-closed', () => {
  if (process.platform !== 'darmainWindow') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a mainWindowdow in the app when the
  // dock icon is clicked and there are no other mainWindowdows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
