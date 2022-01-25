import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class VerifyAdminMiddleware implements NestMiddleware {
  constructor(private userService: UserService, private adminService: AdminService){}
  use(req: any, res: any, next: () => void) {
    
    next();
  }
}
