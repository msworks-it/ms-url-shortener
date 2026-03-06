export class CreateUrlDTO {
  slug: string;
  target: string;
  expiration: Date;
  private?: boolean;
  password?: string;
}
