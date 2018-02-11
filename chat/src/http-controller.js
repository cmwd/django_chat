const { Buffer } = require('buffer');

module.exports = function HttpController() {
  return (req, res) => {
    if (req.method === 'GET' && req.url === '/_healthz') {
      res.statusCode = 200;
      res.end(Buffer.from(`Of course I'm stable!`));
    } else {
      res.statusCode = 404;
      res.end(Buffer.from('Not found.'));
    }
  };
};
