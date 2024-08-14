import { Controller, Post, Body, Request, Response, UseGuards, Get, UseInterceptors, Logger, HttpException } from '@nestjs/common';
import { NextconasetService } from './nextconaset.service';
import { AnulacionExamenDto, ConsultaEstadoDto, CreatePostulanteDto, FinalizacionExamenDto } from './dto';
import { AxiosError } from 'axios';
import { ResponseAnulacionExamenError, ResponseConsultaEstadoError, ResponseFinalizacionExamenError } from './interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeguridadGuard } from '../seguridad/seguridad.guard';
import { DataEstadoFormatPetitionInterceptor, DataEstadoFormatResponseInterceptor, DataPostulanteFormatInterceptor } from '../interceptors';
import { firstValueFrom } from 'rxjs';


@ApiTags('NextConaset')
@UseGuards(SeguridadGuard)
@Controller('v1')
export class NextconasetController {

  private readonly logger = new Logger(NextconasetController.name);

  constructor(private readonly nextconasetService: NextconasetService) { }

  @UseInterceptors(DataPostulanteFormatInterceptor)
  @Post('registrar-postulante')
  @ApiOperation({ summary: "Se crea solicitud para rendir examen para licencia de conducir" })
  @ApiResponse({ status: 201, description: "'{message: Postulación a examen creada con éxito}'" })
  create_postulante(@Body() createPostulanteDto: CreatePostulanteDto, @Response() res) {

    console.log("Cuerpo de la peticion");
    console.log(createPostulanteDto);
    console.log("Cierre del cuerpo de la peticion");
    this.nextconasetService.crear_postulante(createPostulanteDto)
      .subscribe({
        next: (response) => {
          this.logger.verbose(`Respuesta NextConaset => ${response.status} - ${JSON.stringify(response.data)}`);
          return res.status(201).json({
            "ok": true
          });
        },
        error: (error: AxiosError) => {
          const status = error.response.status;
          this.logger.error(`Respuesta NextConaset => ${error.response.status} - ${JSON.stringify(error.response.data)}`);
          return res.status(status).json(error.response.data);
        }
      });
  }

  @UseInterceptors(DataEstadoFormatPetitionInterceptor, DataEstadoFormatResponseInterceptor)
  @Post('consulta-estado')
  @ApiOperation({ summary: "Consulta el estado de la postulación" })
  @ApiResponse({ status: 200, description: "Consulta realizada con éxito" })
  async consulta_estado(@Body() consultaEstadoDto: ConsultaEstadoDto): Promise<any> {
    try {
      const response = await firstValueFrom(this.nextconasetService.consulta_estado(consultaEstadoDto));
      this.logger.verbose(`Respuesta NextConaset previa conversion licencias => ${response.status} - ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status || 500;
        this.logger.error(`Respuesta NextConaset => ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
        throw new HttpException(axiosError.response?.data || { message: 'Internal Server Error' }, status);
      } else {
        this.logger.error(`Respuesta NextConaset => ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
        throw new HttpException({ message: 'Internal Server Error' }, 500);
      }
    }
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

  @Get('prueba-get')
  pueba(@Response() res) {
    const data = this.nextconasetService.prueba_get();
    return res.status(200).json(data);
  }

}
