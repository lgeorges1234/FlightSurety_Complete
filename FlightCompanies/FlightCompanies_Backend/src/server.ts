import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import airlinesRoutes from './handlers/airlinesStore';
import usersRoutes from './handlers/usersStores';
import airportsRoutes from './handlers/airportsStore';
import { userAuthentication } from './middlewares/authentication.middlewares';


const app: express.Application = express();
const port: number = 8080;

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use(userAuthentication);

app.get('/', (_req: express.Request, res: express.Response) => {
  res.send("Welcome to Airlines's API");
});

usersRoutes(app);
airportsRoutes(app);
airlinesRoutes(app);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
