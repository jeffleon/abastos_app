import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { Response, Request, NextFunction } from 'express';

@Service()
@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next?: NextFunction): void {
    response.setHeader(
        "Access-Control-Allow-Origin",
        "*"
      );
      response.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
    next();
  }
}