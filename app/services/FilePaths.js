import fs from 'fs';

export class FilePaths {
  constructor() {
    const app = require('electron').remote.app;
    const appRoot = app.getAppPath();
    const mkdirNotExist = function(dir) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    };

    this.dirData = `${appRoot}/../data`;
    this.dirDataRecordings = `${this.dirData}/recordings`;
    this.dirDataJsons = `${this.dirData}/jsons`;
    this.dirDataExamples = `${this.dirData}/examples`;

    mkdirNotExist(this.dirData);
    mkdirNotExist(this.dirDataRecordings);
    mkdirNotExist(this.dirDataJsons);
  }
}