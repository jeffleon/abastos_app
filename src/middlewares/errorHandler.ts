import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { Response, Request } from 'express';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response) {
    response.status(error.httpCode).json({status: error.httpCode, error: error.message, name: error.name})
    response.end();
  }
}