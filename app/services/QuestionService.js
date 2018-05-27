import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Random } from "../utils";
import { FilePaths } from './FilePaths';

export class QuestionService {
  constructor() {
    const filePaths = new FilePaths();
    this.adapter = new FileSync(`${filePaths.dirDataJsons}/questions.json`);
    this.db = low(this.adapter);

    this.db
      .defaults({
        questions: [
          {
            id: "4ec0f76a-b211-4c60-a830-287a1884fb06",
            question: "Why should we hire you?",
            takes: 0,
            time: 2,
          },
          {
            id: "586b17ce-7085-4515-b7b2-51e81c4bba80",
            question: "Tell me about yourself",
            takes: 0,
            time: 3,
          },
          {
            id: "6e95d09a-5125-4052-9592-cb2a0f9628fe",
            question: "Why do you want this job?",
            takes: 0,
            time: 2,
          },
          {
            id: "ea75d041-9a63-40f4-a81a-420952b67780",
            question: "What are your salary expectations?",
            takes: 0,
            time: 1,
          }
        ]
      })
      .write();

    this.questionDb = this.db.get("questions");
  }

  getAll() {
    return this.questionDb.value();
  }

  getRandom(size: number) {
    const total = this.questionDb.size().value();
    const count = total > size ? size : total;

    const random = new Random(0, total - 1);

    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push(this.questionDb.nth(random.next()).value());
    }
    return questions;
  }
}
