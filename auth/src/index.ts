import express from 'express';
import mongoose from 'mongoose';

import { currentUserRouter } from '@routes/current-user';
import { signinRouter } from '@routes/signin';
import { signoutRouter } from '@routes/signout';
import { signupRouter } from '@routes/signup';
import { errorHandler } from '@middlewares/error-handler';
import { NotFoundError } from '@errors/not-found-error';

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('/api/*name', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/ticketing-auth');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
};

start();
