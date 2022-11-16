import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import airlinesRoutes from './handlers/airlinesStore';
import usersRoutes from './handlers/usersStores';

const app: express.Application = express();
const port: number = 8080;

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.get('/', (_req: express.Request, res: express.Response) => {
  res.send("Welcome to Airlines's API");
});

app.listen(8080, () => {
  console.log(`server started at localhost:${port}`);
});

airlinesRoutes(app);
usersRoutes(app);

export default app;
