import { JsonController, Res, Get, Header } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';

@JsonController()
@Header("Content-Type", "application/json")
@Service()
export class HealthCheckController {
    @Get('/')
    healthCheck(@Res() response: Response) {
        return response.status(200).json({msg: 'ok'});   
    }

}