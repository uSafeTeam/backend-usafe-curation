import { IsOptional } from "class-validator";

export class UpdateNewProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  composition?: string;

  @IsOptional()
  image_url?: string;

  @IsOptional()
  barcode?: string;

  @IsOptional()
  brands?: string;

  @IsOptional()
  countries?: string;

  @IsOptional()
  inserted_date?: Date;

  @IsOptional()
  updated_date?: Date;

  @IsOptional()
  who_update?: string;

  @IsOptional()
  who_send_firebase?: string;

  @IsOptional()
  is_definitive_image?: boolean;

}
