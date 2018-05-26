import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export class RecordingService {
  constructor() {
    this.adapter = new FileSync("./data/jsons/recordings.json");
    this.db = low(this.adapter);

    this.db.defaults({ recordings: [] }).write();
  }

  getAll = function() {
    return this.db.get("recordings").value();
  };
}
