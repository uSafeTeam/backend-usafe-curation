import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class NewProductDto {
    @IsString({message: 'Barcode tem que ser uma string'})
    barcode: string;

    @IsString({message: 'Composição tem que ser uma string'})
    @IsNotEmpty({message: 'Composição não pode ser vazio'})
    composition: string;

    @IsString({message: 'URL da imagem tem que ser uma string'})
    image_url: string;

    @Type(() => Date)
    @IsDate()
    inserted_date: Date;
}