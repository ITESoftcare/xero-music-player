const { app, BrowserWindow, ipcMain, Notification, screen, dialog } = require('electron');
const path = require('path');
const { default: mainIpcs } = require('./main/utils/mainProcess');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
   // eslint-disable-line global-require
   app.quit();
}
let isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
   app.quit();
}

// dialog.showMessageBox({
//   title: 'Application is not responding',
//   buttons: ['Dismiss'],
//   type: 'warning',
//   message: 'Application is not responding…',
//  });

const createWindow = () => {
   // Create the browser mainWindowdow.
   let mainWin = null;
   let loading = new BrowserWindow({
      show: false,
      frame: false,
      width: 400,
      height: 250,
      backgroundColor: '#050407',
      darkTheme: true,
      resizable: false,
      webPreferences: {
         webSecurity: process.env.NODE_ENV !== 'development',
      },
   });

   loading.loadFile(path.join(__dirname, 'loader.html'));

   loading.once('ready-to-show', () => {
      loading.show();
   });

   const primaryDisplay = screen.getPrimaryDisplay();
   const { width, height } = primaryDisplay.workAreaSize;

   loading.once('show', () => {
      mainWin = new BrowserWindow({
         minWidth: 400,
         minHeight: 400,
         width: width - 500,
         height: height - 200,
         show: false,
         // backgroundColor: '#2e2c29',
         // opacity:0.2,
         darkTheme: true,
         // titleBarStyle:'hidden',
         trafficLightPosition: {
            x: 10,
            y: 13,
         },
         frame: false, // NEED TO CHECK ON WIN /MAC ::DONE::
         titleBarStyle: 'hidden',
         titleBarOverlay: {
            color: '#131313',
            symbolColor: '#ffffff',
         },
         webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: process.env.NODE_ENV !== 'development',
         },
      });
      mainWin.webContents.once('dom-ready', () => {
         console.log('mainWin loaded');
         console.log(process.env.NODE_ENV);
         mainWin.show();
         loading.hide();
         loading.close();
      });
      // relocating all IPC Events to mainProcess file to declutter this file
      mainIpcs(mainWin);
      // long loading html
      mainWin.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
   });
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
