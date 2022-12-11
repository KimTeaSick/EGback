import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { NoticesModule } from './notices/notices.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { _dbConn } from './common/mysql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    GroupsModule,
    NoticesModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
