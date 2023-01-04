import { Controller } from '@nestjs/common';
import { MessageService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messageservice: MessageService) {}
}
