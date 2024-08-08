import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataPostulanteFormatInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataPostulanteFormatInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    request.body.driver_licence_class = this.transformClassLicense(request.body.driver_licence_class);
    
    this.logger.warn('Clase Modificada:', request.body.driver_licence_class);
    return next.handle();
  }

  private transformClassLicense(classLicense: string): string {
    switch (classLicense.toLowerCase()) {
      case 'a1n':
        return 'A1P';
      case 'a2n':
        return 'A2P';
      case 'cr':
        return 'C - Restringida';
      case 'bi':
        return 'B-Inglés';
      default:
        return classLicense;
    }
  }
}
