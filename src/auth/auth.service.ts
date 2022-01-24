import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validate(id: number, pass: string):Promise<any>{
        const user = await this.userService.findOne(+id);
        if(user && user.password === pass){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}