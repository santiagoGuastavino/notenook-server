import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true, versionKey: false })
export class Note {
  @Prop({
    type: String,
    required: true,
    nullable: false,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
    nullable: true,
    default: null,
  })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
