import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class AnulacionExamenDto {

    @ApiProperty({ description: "Run del solicitante con codigo verificador", example: "18789789-8" })
    @IsNotEmpty()
    @IsString()
    run_applicant: string;

    @ApiProperty({ description: "Nombre del municipio", example: "TOMÉ" })
    @IsNotEmpty()
    @IsString()
    applicantMunicipality: string;

    @ApiProperty({ description: "Fecha actual de la solicitud en formato 'dia/mes/año'", example: "01/01/2001" })
    @IsNotEmpty()
    @IsString()
    currentDate: string;

    @ApiProperty({ description: "Run del examinador con codigo verificador", example: "15789898-5" })
    @IsNotEmpty()
    @IsString()
    run_examiner: string;

    @ApiProperty({ description: "Seleccion afirmativa en caso de cancelacion" })
    @IsNotEmpty()
    @IsBoolean()
    cancellation: boolean;

    @ApiProperty({ description: "Codigo asociado a una lista de opciones validas para anular", example: "id:1,descripción:Corte de suministro eléctrico" })
    @IsNotEmpty()
    @IsString()
    id_cancellation_reason: string;

    @ApiProperty({ description: "Tipo de licencia solicitada", example: "B" })
    @IsNotEmpty()
    @IsString()
    class: string;

}

