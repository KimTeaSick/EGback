import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    try {
      // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
      req.decoded = jwt.verify(
        req.headers.authorization.slice(7),
        process.env.SECRET_KEY,
      );

      return next();
    } catch (error) {
      // 인증 실패
      // 유효시간이 초과된 경우
      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다.',
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          code: 401,
          message: '유효하지 않은 토큰입니다.',
        });
      }
    }
  }
  // next();
}
