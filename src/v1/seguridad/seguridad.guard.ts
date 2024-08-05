import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class SeguridadGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const apiKey = headers.apikeycrecic;

    if (!apiKey || apiKey !== envs.API_KEY_CRECIC) {
      throw new ForbiddenException('No se permite el acceso a servicios ajenos a empresa CRECIC S.A');
    }
    return true;
  }
}
