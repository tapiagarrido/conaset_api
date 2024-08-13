import { Controller, Render, Res, All } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class ErrorController {

  @All('*')
  @Render('404')
  handleNotFound(@Res() res: Response) {
    res.status(404).render('404');
  }
}
