import { IsJSON, IsNotEmpty, IsString } from "class-validator";


export  class MetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  value: JSON;
}
