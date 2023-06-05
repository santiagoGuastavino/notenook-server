import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { i18nValidationMessage } from 'nestjs-i18n';

export class GetNoteByIdDto {
  @IsNotEmpty({ message: i18nValidationMessage('dto.IS_NOT_EMPTY') })
  @IsMongoId({ message: i18nValidationMessage('dto.IS_MONGO_ID') })
  id: ObjectId;
}
