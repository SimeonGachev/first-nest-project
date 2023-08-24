import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2OTI4NjczMDksImV4cCI6MTY5Mjg2NzkwOX0.2cPwGAjXQaKkEmmAReFBge-WuEbfrnTbkDZYAPOoKNk',
    description: 'JWT token',
  })
  access_token: string;
}
