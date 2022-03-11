const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const simpleCorsHandler = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  next();
};

const preflightCorsHandler = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.set('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = { simpleCorsHandler, preflightCorsHandler };
