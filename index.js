const express = require('express');
const { config } = require('./config');

const tasksApi = require('./routes/tasks.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();
app.use(express.json()); // middleware de bodyparser
tasksApi(app);
app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Escuchando...${config.port}`);
});
