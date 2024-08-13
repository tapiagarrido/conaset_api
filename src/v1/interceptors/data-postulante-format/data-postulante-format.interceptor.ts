import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataPostulanteFormatInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataPostulanteFormatInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Transformar la clase de licencia
    request.body.driver_licence_class = this.transformClassLicense(request.body.driver_licence_class);
    
    // Decodificar los nombres
    request.body.applicant_names = this.decodeSpecialCharacters(request.body.applicant_names);
    request.body.applicant_last_name = this.decodeSpecialCharacters(request.body.applicant_last_name);
    request.body.applicant_second_last_name = this.decodeSpecialCharacters(request.body.applicant_second_last_name);
    
    this.logger.warn('Clase Modificada:', request.body.driver_licence_class);
    this.logger.warn('Nombre Decodificado:', request.body.applicant_names);
    this.logger.warn('Apellido Paterno Decodificado:', request.body.applicant_last_name);
    this.logger.warn('Apellido Materno Decodificado:', request.body.applicant_second_last_name);
    
    return next.handle();
  }

  private transformClassLicense(classLicense: string): string {
    switch (classLicense.toLowerCase()) {
      case 'a1n':
        return 'A1P (Ley 18.290)';
      case 'a2n':
        return 'A2P (Ley 18.290)';
      case 'cr':
        return 'C - Restringida';
      case 'bi':
        return 'B - Inglés';
      default:
        return classLicense;
    }
  }

  private decodeSpecialCharacters(text: string): string {
    // Mapeo de números a caracteres especiales
    const mapeo = {
      '[1]': 'ñ',
      '[2]': 'á',
      '[3]': 'é',
      '[4]': 'í',
      '[5]': 'ó',
      '[6]': 'ú',
      '[7]': 'ü',
      '[8]': 'Á',
      '[9]': 'É',
      '[10]': 'Í',
      '[11]': 'Ó',
      '[12]': 'Ú',
      '[13]': 'Ü',
      '[14]': 'Ñ'
    };

    // Reemplaza los números en el texto por los caracteres correspondientes
    return text.replace(/\[\d+\]/g, (match) => mapeo[match] || match);
  }
}
