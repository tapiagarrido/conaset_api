import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FinalizacionExamenDto {

    @ApiProperty({ description: "Run del aplicante con codigo verificador", example: "14789789-8" })
    @IsNotEmpty()
    @IsString()
    run_applicant: string;

    @ApiProperty({ description: "Nombre de municipio", example: "TOMÉ" })
    @IsNotEmpty()
    @IsString()
    applicantMunicipality: string;

    @ApiProperty({ description: "Fecha actual de la solicitud con formato dia/mes/año", example: "01/01/2000" })
    @IsNotEmpty()
    @IsString()
    currentDate: string;

    @ApiProperty({ description: "Run del examinador con codigo verificador", example: "14569569-9" })
    @IsNotEmpty()
    @IsString()
    run_examiner: string;

    @ApiProperty({ description: "Parametro que define si el examen finalizo o fue anulado", default: false })
    @IsNotEmpty()
    @IsBoolean()
    cancellation: boolean;

    @ApiProperty({ description: "Codigo identificador de causa para cancelación", default: null })
    @IsOptional()
    @IsNumber()
    id_cancellation_reason: number;

    @ApiProperty({ description: "Tipo de licencia solicitada", example: "B" })
    @IsNotEmpty()
    @IsString()
    class: string;

}

