import { ApiProperty } from '@nestjs/swagger';

export class JWtPayloadDto {
  @ApiProperty({ example: 1, description: 'user id' })
  sub: number;

  @ApiProperty({ example: 'username', description: 'username' })
  username: string;

  @ApiProperty({ example: ['user'], description: 'roles of the user' })
  roles: string[];

  @ApiProperty({
    example: 1692884580,
    description: 'token initialization date',
  })
  iat: number;

  @ApiProperty({ example: 1692885180, description: 'token expiration date' })
  exp: number;
}
