import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ResponseDto, ResponseMessage } from 'src/common/dtos/response.dto';
import { Note } from 'src/model/schemas/note.schema';
import { SaveNote } from './dtos/save-note.dto';
import { CreateNoteDto } from './dtos/request/create-note.dto';
import { INote } from 'src/model/interfaces/note.interface';
import { NoteDto } from './dtos/response/note.dto';
import { GetNoteByIdDto } from './dtos/request/get-note-by-id.dto';
import { I18nContext } from 'nestjs-i18n';
import { NotFoundException } from 'src/common/exceptions/NotFound.exception';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly notesModel: Model<Note>,
  ) {}

  public async create(payload: CreateNoteDto): Promise<ResponseDto<object>> {
    const response = new ResponseDto<object>(
      HttpStatus.CREATED,
      ResponseMessage.CREATED,
    );

    const newNote: SaveNote = {
      title: payload.title,
      content: payload.content,
    };
    await this.insertNew(newNote);

    return response;
  }

  public async getNotes(): Promise<ResponseDto<NoteDto[]>> {
    const response = new ResponseDto<NoteDto[]>(
      HttpStatus.OK,
      ResponseMessage.OK,
    );

    const responsePayload: NoteDto[] = await this.findAll();
    response.payload = responsePayload;

    return response;
  }

  public async getNoteById(
    payload: GetNoteByIdDto,
    i18n: I18nContext,
  ): Promise<ResponseDto<NoteDto>> {
    const response = new ResponseDto<NoteDto>(
      HttpStatus.OK,
      ResponseMessage.OK,
    );

    const foundNote: INote = await this.findOne({ _id: payload.id });

    if (!foundNote) throw new NotFoundException(i18n, 'note');

    const responsePayload: NoteDto = foundNote;
    response.payload = responsePayload;

    return response;
  }

  private async insertNew(payload: any): Promise<void> {
    await this.notesModel.create(payload);
  }

  private async findAll(): Promise<INote[]> {
    return await this.notesModel.find().select({ createdAt: 0 }).lean();
  }

  private async findOne(filter: FilterQuery<Note>): Promise<INote> {
    return await this.notesModel
      .findOne(filter)
      .select({ createdAt: 0 })
      .lean();
  }
}
