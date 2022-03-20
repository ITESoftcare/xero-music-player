import { app } from 'electron';
import path from 'path';
import fs from 'fs';
const os = require('os');

export const APP_CONF_FOLDER = app.getPath('userData');
export const MUSIC_DIR = path.join(os.homedir(), 'Music');
export const ALBUM_ART_DIR = path.join(APP_CONF_FOLDER, 'album_arts');
export const ARTIST_ART_DIR = path.join(APP_CONF_FOLDER, 'artist_arts');

try {
   if (!fs.existsSync(ALBUM_ART_DIR)) {
      fs.mkdirSync(ALBUM_ART_DIR);
   }
   if (!fs.existsSync(ARTIST_ART_DIR)) {
      fs.mkdirSync(ARTIST_ART_DIR);
   }
} catch (error) {
   console.log('Folder not Found: Creating...');
   console.log(error);
}
