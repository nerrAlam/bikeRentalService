
// all the imports here
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

// call the express app
const app: Application = express();

// call the express json and cors parser
app.use(express.json());
app.use(cors());

// the test route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, in the World of Traveles. Welcome to bike rental service...');
  });



// use all the routes
app.use('/api', router)

// global error handler
app.use(globalErrorHandler);

// not found api function
app.use(notFound);

// the app exports here
export default app;