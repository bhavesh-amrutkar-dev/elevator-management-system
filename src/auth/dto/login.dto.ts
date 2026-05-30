import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty({
        example: 'bhavesh@gmail.com',
        description: 'User email address',
    })
    email!: string;
    @ApiProperty({
        example: 'Password@123',
        description: 'User password',
    })
    password!: string
}