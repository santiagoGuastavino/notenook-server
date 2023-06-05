import { ObjectId } from 'mongodb';

export class NoteDto {
  _id: ObjectId;
  title: string;
  content: string | null;
  updatedAt: Date;
}
