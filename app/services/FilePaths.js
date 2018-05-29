import fs from 'fs';
import electron from 'electron';
    
export class FilePaths {
  static dirData = '../data';
  static dirDataJsons = `${FilePaths.dirData}/jsons`;
  static dirDataRecordings = `${FilePaths.dirData}/recordings`;
  static dirDataExamples = `${FilePaths.dirData}/examples`;

  static getAppPath(): string {
    if(!FilePaths.appPath) FilePaths.appPath = electron.remote.app.getAppPath();
    return FilePaths.appPath;
  }

  static init() {
    const mkdirNotExist = function(dir) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    };

    mkdirNotExist(FilePaths.resolve(FilePaths.dirData));
    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataJsons));

    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataRecordings));
    mkdirNotExist(FilePaths.resolve(FilePaths.dirDataExamples));
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