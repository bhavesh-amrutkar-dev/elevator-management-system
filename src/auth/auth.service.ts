import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    register() {
        return { message: "User registered successfully From Service" }
    }

}
