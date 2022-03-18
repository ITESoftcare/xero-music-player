import fs from 'fs';
import NodeID3 from 'node-id3';
import path from 'path';
const supportedFileTypes = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.webm', '.m4a'];

export function parseDir(dirPath, arrayOfFiles) {
   arrayOfFiles = arrayOfFiles || [];
   let files = fs.readdirSync(dirPath);

   (function iterator(files) {
      files.forEach(function (file) {
         const isSupported = supportedFileTypes.includes(path.parse(file).ext);
         if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = parseDir(dirPath + '/' + file, arrayOfFiles);
         } else {
            if (isSupported) {
               arrayOfFiles.push(path.join(dirPath, '/', file));
            }
         }
      });
      return arrayOfFiles;
   })(files);

   // enable below code in case of Route Duplication
   // TODO: Prevent Duplication of Songs in the Playlist || aka Duplication Detector

   //  finalfiles.forEach((el, ind, array) => {
   //     if (array.indexOf(el) !== array.lastIndexOf(el)) {
   //        array.splice(ind, 1);
   //     }
   //  });

   return arrayOfFiles;
}
