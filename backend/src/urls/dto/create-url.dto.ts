export class CreateUrlDTO {
  slug: string;
  target: string;
  expiration: Date;
  password?: string;
}
