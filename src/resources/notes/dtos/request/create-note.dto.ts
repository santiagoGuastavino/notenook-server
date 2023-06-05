import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateNoteDto {
  @IsString({ message: i18nValidationMessage('dto.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('dto.IS_NOT_EMPTY') })
  @MaxLength(60, { message: i18nValidationMessage('dto.MAX_LENGTH') })
  title: string;

  @IsString({ message: i18nValidationMessage('dto.IS_STRING') })
  @IsNotEmpty({ message: i18nValidationMessage('dto.IS_NOT_EMPTY') })
  @IsOptional()
  @MaxLength(260, { message: i18nValidationMessage('dto.MAX_LENGTH') })
  content: string;
}
