import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
    createUser(data: RegisterDto){
        return { message: "User Created !"};
    }
}
