import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataEstadoFormatPetitionInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataEstadoFormatPetitionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    this.logger.warn('Revisando y Modificando clase de licencia en petición');
    request.body.class = this.transformClassLicense(request.body.class);
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
