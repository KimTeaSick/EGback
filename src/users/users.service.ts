import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  signup(body) {
    return { status: 200 };
  }
  login() {
    return { status: 200 };
  }
}
