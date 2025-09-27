import { IsArray, IsString } from "class-validator";

export class GoManyToFirebaseDto {
  @IsArray()
  ids: string[];

  @IsString()
  whoSendToFirebase: string;
}