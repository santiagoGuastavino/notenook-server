import { ObjectId } from 'mongodb';

export interface INote {
  _id: ObjectId;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}
