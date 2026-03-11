import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUrlDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 120)
  slug: string;

  @ApiProperty()
  @IsUrl()
  target: string;

  @ApiProperty()
  @IsDate()
  expiration: Date;

  @ApiProperty()
  @IsStrongPassword()
  password?: string;
}
