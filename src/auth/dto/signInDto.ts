import { ApiProperty } from '@nestjs/swagger';

export class signInDto {
  @ApiProperty({ example: 'username', description: 'username' })
  username: string;

  @ApiProperty({ example: 'password', description: 'password' })
  password: string;
}
