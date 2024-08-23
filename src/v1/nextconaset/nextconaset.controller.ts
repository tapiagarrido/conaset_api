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
  
      const data = response.data;
      const { class: license_class } = consultaEstadoDto;
  
      const aplicanteBuscado = data.filter((item: any) => item.license_name === license_class);

      if (aplicanteBuscado.length === 0) {
        return { "message": "Resultado de examen no encontrado"};
      }
  
      const highOportunityNumber = aplicanteBuscado.reduce((prev: any, current: any) => {
        return (prev.opportunity_number > current.opportunity_number) ? prev : current;
      });
  
      this.logger.verbose(`Respuesta NextConaset previa conversion licencias => ${response.status} - ${JSON.stringify(highOportunityNumber)}`);

      return [highOportunityNumber];
  
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
  
}
