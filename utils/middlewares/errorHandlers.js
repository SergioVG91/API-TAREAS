const boom = require('@hapi/boom');
const { config } = require('../../config');
//Dependiendo de la configuracion nos imprime el estack o no
const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
};
//Imprime el error
const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};
//Checamos si el error es de tipo boom, sino es lo convertimos para que en el
//siguiente middleware (errorHandler) ya pueda manejarlo como de tipo boom
const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
};
//como es una API lo mejor es manejar el envio de error con json
const errorHandler = (err, req, res, next) => {
  // Apartir del error que ya va ha ser de tipo boom debemos sacar el output,
  // es la manera como le da menejo boom y ahoi podemos sacar el status code del error y el payload
  const {
    output: { statusCode, payload },
  } = err;
  // ahora no necesitamos manejar error.status, sino simplemente statusCode
  res.status(statusCode);
  // acá en lugar de pasar el error message pasamos el payload
  res.json(withErrorStack(payload, err.stack));
};
module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
