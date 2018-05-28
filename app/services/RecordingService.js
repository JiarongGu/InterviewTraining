import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { FilePaths } from './FilePaths';

export interface Recording {
  id: string;
  filePath: string;
  questionId: string;
  duration: number;
}

export class RecordingService {
  constructor() {
    this.adapter = new FileSync(`${FilePaths.resolve(FilePaths.dirDataRecordings)}/recordings.json`);

    this.db = low(this.adapter);
    this.db.defaults({ recordings: [] }).write();
    this.recordingsDb = this.db.get('recordings');

    this.db._.mixin({
      insert: function(collection, document) {
        collection.push(document);
        return collection;
      }
    });
  }

  getAll = function() {
    return this.recordingsDb.value();
  };

  insert = function(recording: Recording) {
    return this.recordingsDb.insert(recording).write();
  };

  getById = function(id: string): Recording {
    return this.recordingsDb.find({ id }).value();
  };

  update = function(recording: Recording) {
    this.recordingsDb.find({ id: recording.id })
      .assign({ ...recording })
      .write();
  };
}
