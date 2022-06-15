import express from 'express';
import loginRouter from './routes/loginRouter';
import usersRouter from './routes/usersRoutes';
import error from './middlewares/errorMiddleware';

class App {
  public app: express.Application;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.routes();
    this.error();
  }

  private config():void {
    // const accessControl: express.RequestHandler = (_req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
    //   res.header('Access-Control-Allow-Headers', '*');
    //   next();
    // };

    this.app.use(express.json());
    // ...
  }

  private routes() {
    this.app.use(express.json());
    this.app.use('/login', loginRouter);
    this.app.use('/register', usersRouter);

    this.app.use(error);
  }

  private error() {
    this.app.use(error);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
