import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class FinalMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next?: NextFunction): void {
    if(!res.headersSent) {
      res.status(404).json({status: 404, error: "route not found", name: "not found"});
    }
    res.end();
  }

}