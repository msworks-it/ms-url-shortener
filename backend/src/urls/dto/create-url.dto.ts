import {
  IsDate,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUrlDTO {
  @IsString()
  @Length(3, 120)
  slug: string;

  @IsUrl()
  target: string;

  @IsDate()
  expiration: Date;

  @IsStrongPassword()
  password?: string;
}
