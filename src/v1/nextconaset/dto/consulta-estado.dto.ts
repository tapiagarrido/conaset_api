import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class ConsultaEstadoDto {

    @ApiProperty({ description: "Run del aplicante con codigo verificador", example: "14789546-8" })
    @IsNotEmpty()
    @IsString()
    run_applicant: string;

    @ApiProperty({ description: "Tipo de licencia solicitada", example: "B" })
    @IsNotEmpty()
    @IsString()
    class: string;

    @ApiProperty({ description: "Fecha establecida para el examen en formato dia/mes/año", example: "01/01/2000" })
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({description:"Municipio de origen para mantener log dirigido", example:"TOMÉ"})
    @IsNotEmpty()
    @IsString()
    municipio: string;

}
