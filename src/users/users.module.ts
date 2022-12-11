import { UsersService } from './users.service';
import { UsersContoroller } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersContoroller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
