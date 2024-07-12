import { Controller, Post, Body, Request, Response, UseGuards } from '@nestjs/common';
import { NextconasetService } from './nextconaset.service';
import { AnulacionExamenDto, ConsultaEstadoDto, CreatePostulanteDto, FinalizacionExamenDto } from './dto';
import { AxiosError } from 'axios';
import { ResponseAnulacionExamenError, ResponseConsultaEstadoError, ResponseFinalizacionExamenError } from './interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeguridadGuard } from '../seguridad/seguridad.guard';


@ApiTags('NextConaset')
@UseGuards(SeguridadGuard)
@Controller('v1/nextconaset')
export class NextconasetController {
  constructor(private readonly nextconasetService: NextconasetService) { }

  @Post('registrar-postulante')
  @ApiOperation({ summary: "Se crea solicitud para rendir examen para licencia de conducir" })
  @ApiResponse({ status: 201, description: "'{message: Postulación a examen creada con éxito}'" })
  create_postulante(@Body() createPostulanteDto: CreatePostulanteDto, @Response() res) {

    this.nextconasetService.crear_postulante(createPostulanteDto)
      .subscribe({
        next: (response) => {
          return res.status(201).json(response.data);
        },
        error: (error: AxiosError) => {
          const status = error.response.status;
          return res.status(status).json(error.response.data);
        }
      });
  }

  @Post('consulta-estado')
  @ApiOperation({ summary: "Consulta el estado de la postulación" })
  consulta_estado(@Body() consultaEstadoDto: ConsultaEstadoDto, @Response() res) {

    this.nextconasetService.consulta_estado(consultaEstadoDto)
      .subscribe({
        next: (response) => {
          return res.status(200).json(response.data);
        },
        error: (error: AxiosError<ResponseConsultaEstadoError>) => {
          const status = error.response.status;
          return res.status(status).json(error.response.data);
        }
      });

  }

  @Post('anular-examen')
  @ApiOperation({ summary: "Se solicita la anulación del examen asociando una causa valida" })
  anular_examen(@Body() anulacionExamenDto: AnulacionExamenDto, @Response() res) {

    this.nextconasetService.anulacion_examen(anulacionExamenDto)
      .subscribe({
        next: (response) => {
          return res.status(201).json(response.data);
        },
        error: (error: AxiosError<ResponseAnulacionExamenError>) => {
          const status = error.response.status;
          return res.status(status).json(error.response.data);
        }
      });

  }

  @Post('finalizar-examen')
  @ApiOperation({ summary: "Se solicita el cierre del examen posterior a rendir el mismo" })
  finalizar_examen(@Body() finalizacionExamenDto: FinalizacionExamenDto, @Response() res) {

    this.nextconasetService.finalizacion_examen(finalizacionExamenDto)
      .subscribe({
        next: (response) => {
          return res.status(201).json(response.data);
        },
        error: (error: AxiosError<ResponseFinalizacionExamenError>) => {
          const status = error.response.status;
          return res.status(status).json(error.response.data);
        }
      })

  }

}
