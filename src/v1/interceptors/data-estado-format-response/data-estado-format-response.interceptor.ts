import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DataEstadoFormatResponseInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataEstadoFormatResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    this.logger.warn('Modificando las clases de licencias en respuesta');
    return next.handle().pipe(
      tap(response => {
        if (Array.isArray(response)) {
          response.forEach(element => {
            if (element && element.license_name) {
              element.license_name = this.transformClassLicense(element.license_name);
            }
          });
        } else if (response && response.license_name) {
          response.license_name = this.transformClassLicense(response.license_name);
        }
      })
    );
  }

  private transformClassLicense(classLicense: string): string {
    switch (classLicense.toLowerCase()) {
      case 'A1P (Ley 18.290)':
        return 'A1N';
      case 'A2P (Ley 18.290)':
        return 'A2N';
      case 'C - Restringida':
        return 'CR';
      case 'B - Inglés':
        return 'B';
      default:
        return classLicense;
    }
  }
}
