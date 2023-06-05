import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { IUser } from 'src/model/interfaces/user.interface';
import { User } from 'src/model/schemas/user.schema';
import { SaveUser } from './dtos/save-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  async findOne(filter: FilterQuery<User>): Promise<IUser> {
    return await this.usersModel.findOne(filter).lean();
  }

  async insertNew(payload: SaveUser): Promise<IUser> {
    return await this.usersModel.create(payload);
  }

  async updateOne(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
  ): Promise<IUser> {
    return await this.usersModel
      .findOneAndUpdate(filter, update, {
        returnOriginal: false,
      })
      .lean();
  }
}
