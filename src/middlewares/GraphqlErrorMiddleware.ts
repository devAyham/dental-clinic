import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomGqlExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        const response = exception.getResponse();
        const statusCode = exception.getStatus();

        const error = {
            message: response['message'] || 'An error occurred',
            statusCode: statusCode || 500,
            timestamp: new Date().toISOString(),
        };

        gqlHost.getContext().res.status(statusCode || 500);

        return {
            errors: [error],
        };
    }
}