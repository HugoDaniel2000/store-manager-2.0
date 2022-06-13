import { App } from './index';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

new App().start(PORT);
