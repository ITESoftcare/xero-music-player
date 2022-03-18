import fs from 'fs';

export function writeImageBuffer(imageBuffer, savePath) {
   fs.writeFileSync(savePath, imageBuffer, function (err) {
      if (err) {
         console.log('An error occured while Saving Object to File.');
         return console.log(err);
      }
   });
}
