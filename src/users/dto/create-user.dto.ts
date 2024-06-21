import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsAlpha, IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@doe.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsAlpha()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsAlpha()
  lastName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: '1',
  })
  @IsInt()
  @Type(() => Number)
  roleId: number;
}
