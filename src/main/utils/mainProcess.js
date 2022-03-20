import { BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { parseDir, parseMusic } from '../modules/FileParser';

export default function mainIpcs(mainWin) {
   ipcMain.on('minimize', () => mainWin.minimize());
   ipcMain.on('maximize', () => {
      if (mainWin.isMaximized()) {
         mainWin.unmaximize();
         mainWin.center();
      } else {
         mainWin.maximize();
      }
   });

   ipcMain.on('closeWindow', () => {
      mainWin.close();
   });

   ipcMain.on('show-dialog', (e, payload) => {
      const { title } = payload;
      dialog.showMessageBox({
         title: title,
         buttons: ['Dismiss'],
         type: 'warning',
         message: 'Application is not responding…',
      });
   });

   ipcMain.on('show-file-picker', async (e, payload) => {
      const { title } = payload;
      let myTracks = [];
      dialog
         .showOpenDialog(mainWin, {
            title: 'Select Music Folder',
            properties: ['openDirectory'],
         })
         .then(result => {
            if (result.canceled) {
               console.log('Dialog was canceled');
            } else {
               const folder = result.filePaths[0];
               try {
                  const SongsPathList = parseDir(folder);

                  SongsPathList.forEach(songPath => {
                     const SongInfo = parseMusic(songPath);
                     SongInfo.then(song => {
                        console.log('Info', song);
                     });
                  });

                  // const folderCont = fs
                  //    .readdirSync(folder)
                  //    .map(content => path.join(folder, content))
                  //    .map(content => path.parse(content))
                  //    .map(pathObject => {
                  //       const po = { name: pathObject.name, extension: pathObject.ext };
                  //       return po;
                  //    });
                  // const subFolders = folderCont
                  //    .filter(content => content.extension == '')
                  //    .map(subFolder => path.join(folder, subFolder.name));
                  // file;
                  // console.log(myList);
                  // console.log(subFolders);
                  // previewWin.loadURL(`file://${file}`);
               } catch (e) {
                  console.log(e);
               }
            }
         })
         .catch(err => {
            console.log(err);
         });
   });
}
