import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataEstadoFormatPetitionInterceptor implements NestInterceptor {

  private readonly logger = new Logger(DataEstadoFormatPetitionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    this.logger.warn('Revisando y Modificando clase de licencia en petición');

    // Verificar si la propiedad 'class' existe y no es nula o indefinida antes de transformar
    if (request.body.class !== null && request.body.class !== undefined) {
      request.body.class = this.transformClassLicense(request.body.class);
    }

    return next.handle();
  }

  private transformClassLicense(classLicense: string): string {
    switch (classLicense.toLowerCase()) {
      case 'a1':
        return 'A1P (Ley 18.290)';
      case 'a2':
        return 'A2P (Ley 18.290)';
      case 'a1n':
        return 'A1P';
      case 'a2n':
        return 'A2P';
      case 'cr':
        return 'C - Restringida';
      case 'bi':
        return 'B - Inglés';
      default:
        return classLicense;
    }
  }
}
