import fs from 'fs';

export function writeImageBuffer(imageBuffer, savePath) {
   fs.writeFileSync(savePath, imageBuffer, function (err) {
      if (err) {
         console.log('An error occured while Saving Object to File.');
         return console.log(err);
      }
   });
}
export function ArrayBuff2ImgBuff(PictureObj) {
   const { data, format } = PictureObj;
   const btoa = text => {
      return Buffer.from(text, 'binary').toString('base64');
   };

   let base64String = '';
   for (let i = 0; i < data.length; i++) {
      base64String += String.fromCharCode(data[i]);
   }
   return `data:${format};base64,${btoa(base64String)}`;
}
