import { DatabaseConnectionError } from '@errors/database-connection-error';
import { RequestValidationError } from '@errors/request-validation-error';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    if (err instanceof DatabaseConnectionError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    res.status(400).send({ errors: [{ message: 'Something went wrong', field: undefined }] });
    return;
};
