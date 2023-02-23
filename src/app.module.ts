import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { NoticesModule } from './notices/notices.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareModule } from './middleware/middleware.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RequestMethod } from '@nestjs/common';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    ConfigModule.forRoot(),
    GroupsModule,
    NoticesModule,
    MessagesModule,
    PassportModule,
    MiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude(
    //     { path: 'users/login', method: RequestMethod.ALL },
    //     { path: 'users/signup', method: RequestMethod.ALL },
    //     '/users/(.*)',
    //   )
    //   .forRoutes('*');
  }
}
