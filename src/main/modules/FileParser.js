import fs from 'fs';
import path from 'path';
import { ALBUM_ART_DIR } from '../../config/core_config';
import { ArrayBuff2ImgBuff } from '../utils/misc';
const supportedFileTypes = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.webm', '.m4a'];
var jsmediatags = require('jsmediatags');

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

function removeMIME(str) {
   return str.replace(/(\.mp3)|(\.m4a)|(\.ogg)|(\.wav)/gi, '');
}

export function parseMusic(musicPath) {
   //return new promise with parsed music
   return new Promise((resolve, reject) => {
      let music = {
         fileInfo: {
            tagType: '', // ID3 = mp3 || APE = wav || OGG = ogg || FLAC = flac || M4A = m4a
            path: musicPath, // Explicit path
            fileName: path.parse(musicPath).name,
            fileExt: path.parse(musicPath).ext,
            fileSize: fs.statSync(musicPath).size,
            folderName: path.parse(path.parse(musicPath).dir).base,
            folderpath: path.parse(musicPath).dir,
         },
         tags: {
            title: '',
            artist: '',
            album: '',
            track: '',
            genre: '',
            year: '',
            albumArt: '',
         },
      };
      jsmediatags.read(musicPath, {
         onSuccess: function (tag) {
            let { type, tags } = tag;

            music.fileInfo.tagType = type;
            music.tags.title = tags.title;
            music.tags.artist = tags.artist;
            music.tags.album = tags.album;
            music.tags.track = tags.track;
            music.tags.genre = tags.genre;
            music.tags.year = tags.year;

            if (tag && tags.picture.data) {
               tags.picture.type = tags.picture.type
                  ? tags.picture.type.replace(/image\//g, '')
                  : 'jpg';
               console.log('final', tags.picture.type);

               const albumArtPath = path.join(
                  ALBUM_ART_DIR,
                  `${removeMIME(music.fileInfo.fileName)}.${'jpg'}`
               );

               const base64Img = ArrayBuff2ImgBuff(tags.picture);
               let m = base64Img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
               let b = Buffer.from(m[2], 'base64');

               fs.writeFile(String(albumArtPath), b, function (err) {
                  if (err) {
                     console.log(err);
                  } else {
                     console.log('The file has been saved!');
                  }
               });
               // writeImageBuffer(tags.picture.data, albumArtPath);
               music.tags.albumArt = albumArtPath;
            }
            resolve(music);
         },
         onError: function (error) {
            console.log(':(', error.type, error.info);
         },
      });
   });
}
