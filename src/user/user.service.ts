import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
@Injectable()
export class UserService {
    createUser(data: RegisterDto){
        return { message: "User Created !"};
    }
}
