import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/request/create-note.dto';
import { NoteDto } from './dtos/response/note.dto';
import { GetNoteByIdDto } from './dtos/request/get-note-by-id.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateNoteDto): Promise<ResponseDto<object>> {
    try {
      const response: ResponseDto<object> = await this.notesService.create(
        payload,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getNotes(): Promise<ResponseDto<NoteDto[]>> {
    try {
      const response: ResponseDto<NoteDto[]> =
        await this.notesService.getNotes();

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getNoteById(
    @Param() payload: GetNoteByIdDto,
    @I18n() i18n: I18nContext,
  ): Promise<ResponseDto<NoteDto>> {
    try {
      const response: ResponseDto<NoteDto> =
        await this.notesService.getNoteById(payload, i18n);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
