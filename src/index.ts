import express from 'express';

import loginRouter from './routes/loginRouter';
import usersRouter from './routes/usersRoutes';
import productsRouter from './routes/productsRoutes';
import salesRouter from './routes/salesRoutes';

import error from './middlewares/errorMiddleware';

class App {
  public app: express.Application;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.routes();
    this.error();
  }

  private routes() {
    this.app.use(express.json());
    this.app.use('/login', loginRouter);
    this.app.use('/user', usersRouter);
    this.app.use('/products', productsRouter);
    this.app.use('/sales', salesRouter);

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
