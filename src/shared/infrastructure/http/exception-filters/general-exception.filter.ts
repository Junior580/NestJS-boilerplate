import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(Error)
export class GeneralErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    response.status(500).send({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: `Erro interno do servidor: ${JSON.stringify(exception)}`,
    });
  }
}
