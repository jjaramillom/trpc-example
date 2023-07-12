import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import bodyParser from 'body-parser';

import { loggerMiddleware } from './middleware';
import { logger } from './utils';

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

const PORT = 5000;

// catch 404 and forward to error handler
app.use((_, __, next: NextFunction) => {
  next(createError(404, 'page not found'));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

app.listen(PORT, () => {
  logger.info(`server is running on http://localhost:${PORT}`);
});

// Exported for testing
export default app;
