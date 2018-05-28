import fs from 'fs';
import electron from 'electron';
    
export class FilePaths {
  constructor() {
    const mkdirNotExist = function(dir) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    };

    mkdirNotExist(FilePaths.resolve(FilePaths.dirData));
    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataRecordings));
    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataJsons));
    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataExamples));
  }

  static dirData = '../data';
  static dirDataRecordings = `${FilePaths.dirData}/recordings`;
  static dirDataJsons = `${FilePaths.dirData}/jsons`;
  static dirDataExamples = `${FilePaths.dirData}/examples`;

  static getAppPath(): string {
    if(!FilePaths.appPath) FilePaths.appPath = electron.remote.app.getAppPath();
    return FilePaths.appPath;
  }

  static resolve(relativePath: string): string {
    return `${FilePaths.getAppPath()}/${relativePath}`;
  }

  static relative(absolutePath: string): string {
    if (absolutePath.indexOf(FilePaths.getAppPath()) > -1)
    {
      return absolutePath.substring(FilePaths.getAppPath().length + 1);
    }
    return absolutePath;
  }
}