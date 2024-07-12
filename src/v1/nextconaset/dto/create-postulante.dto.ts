import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePostulanteDto {

    @ApiProperty({ description: "Run del postulante sin codigo verificador", example: "18789784" })
    @IsNotEmpty()
    @IsString()
    applicant_run: string;

    @ApiProperty({ description: "Codigo verificador de run postulante" })
    @IsNotEmpty()
    @IsString()
    applicant_run_dv: string;

    @ApiProperty({ description: "Nombres del postulante", example: "Jose Andres" })
    @IsNotEmpty()
    @IsString()
    applicant_names: string;

    @ApiProperty({ description: "Primer apellido del postulante", example: "Toro" })
    @IsNotEmpty()
    @IsString()
    applicant_last_name: string;

    @ApiProperty({ description: "Segundo apellido del postulante", example: "Rojas" })
    @IsNotEmpty()
    @IsString()
    applicant_second_last_name: string;

    @ApiProperty({ description: "Identificador del municipio", example: "321" })
    @IsNotEmpty()
    @IsNumber()
    id_municipality: number;

    @ApiProperty({ description: "Nombre del municipio", example: "TOMÉ" })
    @IsNotEmpty()
    @IsString()
    name_municipality: string;

    @ApiProperty({ description: "Fecha inicio del proceso en formato dia/mes/año", example: "01/01/2000" })
    @IsNotEmpty()
    @IsString()
    date_start_procedure: string;

    @ApiProperty({ description: "Tipo de licencia a obtener", example: "B" })
    @IsNotEmpty()
    @IsString()
    driver_licence_class: string;
}
