function response(res, data) {
  return res.status(data.statusCode).json(data.body);
}

export default response;