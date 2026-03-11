import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccessDTO {
  @ApiProperty()
  password: string;
}
