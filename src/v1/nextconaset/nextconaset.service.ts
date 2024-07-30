import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AnulacionExamenDto, ConsultaEstadoDto, CreatePostulanteDto, FinalizacionExamenDto } from './dto';
import { ResponseAnulacionExamenOk, ResponseConsultaEstadoError, ResponseConsultaEstadoOk, ResponseCreatePostulante, ResponseFinalizacionExamenOk } from './interface';
import { envs } from 'src/config';

@Injectable()
export class NextconasetService {

  private readonly logger = new Logger(NextconasetService.name);


  private configuracion: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": envs.X_API_KEY
    }
  };

  constructor(
    private readonly httpService: HttpService

  ) { }

  crear_postulante(createPostulanteDto: CreatePostulanteDto): Observable<AxiosResponse<ResponseCreatePostulante>> {

    const url = `${envs.BASE_URL_CONASET}/applicant/external/create`;

    this.logger.log(`Creando postulacion para ${createPostulanteDto.applicant_run}`);

    return this.httpService.post<ResponseCreatePostulante>(url, createPostulanteDto, this.configuracion)
      .pipe(
        catchError((error: AxiosError) => {
          throw error;
        })
      );

  }

  consulta_estado(consultaEstadoDto: ConsultaEstadoDto): Observable<AxiosResponse<ResponseConsultaEstadoOk[]>> {

    const url = `${envs.BASE_URL_CONASET}/exam/external/renditions/result`;

    this.logger.log(`Consultando estado de postulacion para ${consultaEstadoDto.run_applicant}`);

    return this.httpService.post<ResponseConsultaEstadoOk[]>(url, consultaEstadoDto, this.configuracion)
      .pipe(
        catchError((error: AxiosError<ResponseConsultaEstadoError>) => {
          throw error;
        })
      );

  }

  anulacion_examen(anulacionExamenDto: AnulacionExamenDto): Observable<AxiosResponse<ResponseAnulacionExamenOk>> {

    const url = `${envs.BASE_URL_CONASET}/exam/external/renditions/end`;

    this.logger.log(`Anulando examen para ${anulacionExamenDto.run_applicant}`);

    return this.httpService.post<ResponseAnulacionExamenOk>(url, anulacionExamenDto, this.configuracion)
      .pipe(
        catchError((error: AxiosError) => {
          throw error;
        })
      );

  }

  finalizacion_examen(finalizacionExamenDto: FinalizacionExamenDto): Observable<AxiosResponse<ResponseFinalizacionExamenOk>> {

    const url = `${envs.BASE_URL_CONASET}/exam/external/renditions/end`;

    this.logger.log(`Finalizando examen para ${finalizacionExamenDto.run_applicant}`);

    return this.httpService.post<ResponseFinalizacionExamenOk>(url, finalizacionExamenDto, this.configuracion)
      .pipe(
        catchError((error: AxiosError) => {
          throw error;
        })
      );

  }

  prueba_get(){

    this.logger.log("Llamando a la api");
    
    return {msg:"Esta llamada ha salido exitosamente"}

  }

}
