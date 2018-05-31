import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { FilePaths } from './FilePaths';
import { moment } from '../utils';
import fs from 'fs';

export interface Recording {
  id: string;
  filePath: string;
  questionId: string;
  duration: number;
  created?: string;
}

export class RecordingService {
  constructor() {
    this.adapter = new FileSync(`${FilePaths.resolve(FilePaths.dirDataJsons)}/recordings.json`);

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

  getById = function(id: string): Recording {
    return this.recordingsDb.find({ id }).value();
  };
  
  getByQuestionId = function(questionId: string): Recording[] {
    return this.recordingsDb.filter({ questionId: questionId }).value();
  }

  insert = function(recording: Recording) {
    recording.created = moment().format('YYYY-MM-DD HH:mm:ss');
    return this.recordingsDb.insert(recording).write();
  };

  update = function(recording: Recording) {
    this.recordingsDb.find({ id: recording.id })
      .assign({ ...recording })
      .write();
  };

  delete = function(recordingId: string) {
    var recording = this.recordingsDb.find({ id: recordingId }).value();
    var filePath = FilePaths.resolve(recording.filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    this.recordingsDb.remove({ id: recordingId }).write()
  }
}
