export class CustomError {
  public status: number;
  public message: string;
  public description: string;

  constructor(status: number, message: string, description: string) {
    this.message = message;
    this.status = status;
    this.description = description;
  }
}
