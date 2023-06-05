import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { ResponseMessage } from 'src/common/dtos/response.dto';

export class AlreadyActivatedException extends HttpException {
  constructor(i18n: I18nContext) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ResponseMessage.BAD_REQUEST,
        errors: [
          {
            entity: 'user',
            children: [],
            constraints: {
              ALREADY_ACTIVATED: i18n.t('exceptions.ALREADY_ACTIVATED'),
            },
          },
        ],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
