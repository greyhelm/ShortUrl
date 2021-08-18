export class CreateURLDto {
  readonly originalUrl: string;
  readonly shortUrl: string;
  readonly linkUsage: number;
  readonly timeStamp: string;
}
