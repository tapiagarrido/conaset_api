import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DataEstadoFormatResponseInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataEstadoFormatResponseInterceptor.name);


  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    this.logger.warn('Modificando las clases de licencias y fechas en respuesta');
    return next.handle().pipe(
      tap(response => {
        if (Array.isArray(response)) {
          response.forEach(element => {
            if (element && element.license_name) {
              element.license_name = this.transformClassLicense(element.license_name);
            }
            if (element && element.date) {
              element.date = this.transformDate(element.date);
            }
          });
        } else {
          if (response && response.license_name) {
            response.license_name = this.transformClassLicense(response.license_name);
          }
          if (response && response.date) {
            response.date = this.transformDate(response.date);
          }
        }
      })
    );
  }


  private transformClassLicense(classLicense: string): string {
    switch (classLicense.toLowerCase()) {
      case 'a1p (ley 18.290)':
        return 'A1';
      case 'a2p (ley 18.290)':
        return 'A2';
      case 'a1':
        return 'A1N';
      case 'a2':
        return 'A2N';
      case 'c - restringida':
        return 'CR';
      case 'b - inglés':
        return 'B';
      default:
        return classLicense;
    }
  }

  private transformDate(dateStr: string): string {
    const [datePart, timePart] = dateStr.split(', ');
    const [month, day, year] = datePart.split('/');
    const isoDate = `${year}-${month}-${day}T${timePart}.000Z`;
    return isoDate;
  }
  
}

