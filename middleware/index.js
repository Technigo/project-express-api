// JSON Validation Middleware
export const requireJsonContent = () => {
  return (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(400).send({
        status: '400 Bad Request',
        message: 'Server requires MIME type application/json'
      });
    } else {
      next();
    }
  };
};
