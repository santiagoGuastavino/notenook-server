import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { I18nModule } from './i18n/i18n.module';
import { NotesModule } from './resources/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB,
    ),
    I18nModule,
    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}
