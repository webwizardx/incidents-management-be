import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    example: 'admin@mercantilseguros.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
