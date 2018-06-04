import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Random } from '../utils';
import { FilePaths } from './FilePaths';

export interface Example {
  src: string;
  img: string;
}

export interface Question {
  id: string;
  question: string;
  takes: number;
  time: number;
  examples?: Example[];
}

export class QuestionService {
  constructor() {
    this.adapter = new FileSync(
      `${FilePaths.resolve(FilePaths.dirDataJsons)}/questions.json`
    );
    this.db = low(this.adapter);

    this.db
      .defaults({
        questions: [
          {
            id: '4ec0f76a-b211-4c60-a830-287a1884fb06',
            question: 'Why should we hire you?',
            takes: 0,
            time: 2,
            examples: [
              {
                src: 'https://www.youtube.com/embed/RiKXKYNlwFQ',
                img: '../data/images/1-1.png'
              },
              {
                src: 'https://www.youtube.com/embed/pn2wTbrCDDY',
                img: '../data/images/1-2.png'
              },
              {
                src: 'https://www.youtube.com/embed/B3M3A6V1GRo',
                img: '../data/images/1-3.png'
              },
              {
                src: 'https://www.youtube.com/embed/-OkaJpO_Sbo',
                img: '../data/images/1-4.png'
              },
              {
                src: 'https://www.youtube.com/embed/r9lQbnLi-to',
                img: '../data/images/1-5.png'
              },
              {
                src: 'https://www.youtube.com/embed/BFOCqoOo3gY',
                img: '../data/images/1-6.png'
              }
            ]
          },
          {
            id: '586b17ce-7085-4515-b7b2-51e81c4bba80',
            question: 'Tell me about yourself',
            takes: 0,
            time: 3,
            examples: [
              {
                src: 'https://www.youtube.com/embed/kayOhGRcNt4',
                img: '../data/images/2-1.png'
              },
              {
                src: 'https://www.youtube.com/embed/5pu78pOuo8o',
                img: '../data/images/2-2.png'
              },
              {
                src: 'https://www.youtube.com/embed/EM7ZPk2VBXI',
                img: '../data/images/2-3.png'
              },
              {
                src: 'https://www.youtube.com/embed/HrGXbouxh4g',
                img: '../data/images/2-4.png'
              },
              {
                src: 'https://www.youtube.com/embed/Cyww7eRVj3E',
                img: '../data/images/2-5.png'
              },
              {
                src: 'https://www.youtube.com/embed/l2UAMSPGx8I',
                img: '../data/images/2-6.png'
              }
            ]
          },
          {
            id: '6e95d09a-5125-4052-9592-cb2a0f9628fe',
            question: 'Why do you want this job?',
            takes: 0,
            time: 2,
            examples: [
              {
                src: 'https://www.youtube.com/embed/qqbekQ7MPEI',
                img: '../data/images/3-1.png'
              },
              {
                src: 'https://www.youtube.com/embed/MUt6d-D_KXg',
                img: '../data/images/3-2.png'
              },
              {
                src: 'https://www.youtube.com/embed/AdKk5Qf_GUg',
                img: '../data/images/3-3.png'
              },
              {
                src: 'https://www.youtube.com/embed/OJJtMd7nyxw',
                img: '../data/images/3-4.png'
              },
              {
                src: 'https://www.youtube.com/embed/yivYmzS2iFs',
                img: '../data/images/3-5.png'
              },
              {
                src: 'https://www.youtube.com/embed/8ggEDL7HJx0',
                img: '../data/images/3-6.png'
              }
            ]
          },
          {
            id: 'ea75d041-9a63-40f4-a81a-420952b67780',
            question: 'What are your salary expectations?',
            takes: 0,
            time: 1,
            examples: [
              {
                src: 'https://www.youtube.com/embed/99kFlOcxgVI',
                img: '../data/images/4-1.png'
              },
              {
                src: 'https://www.youtube.com/embed/SOgAHPBkvz0',
                img: '../data/images/4-2.png'
              },
              {
                src: 'https://www.youtube.com/embed/CNp5y0Z71bw',
                img: '../data/images/4-3.png'
              },
              {
                src: 'https://www.youtube.com/embed/uIDslx4_bK0',
                img: '../data/images/4-4.png'
              },
              {
                src: 'https://www.youtube.com/embed/OM6lyWL-WHs',
                img: '../data/images/4-5.png'
              },
              {
                src: 'https://www.youtube.com/embed/Fk4nnWTL-_E',
                img: '../data/images/4-6.png'
              }
            ]
          }
        ]
      })
      .write();

    this.questionDb = this.db.get('questions');
  }

  getAll() {
    return this.questionDb.value();
  }

  getExamples(questionId: string) : Example[]
  {
    const question = this.questionDb.find({id: questionId}).value();
    return question ? question.examples : [];
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
