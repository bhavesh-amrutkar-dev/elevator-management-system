import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
   async register(data: RegisterDto) {
        console.log("data", data);
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(data.password, saltRounds)
        const res = this.userService.createUser(...data, password: hashPass)
        return res;
    }

}
