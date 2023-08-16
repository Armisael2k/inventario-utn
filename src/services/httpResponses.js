export function ok(body={}) {
  return {
    statusCode: 200,
    body: body
  }
}

export function clientError(error) {
  return {
    statusCode: 400,
    body: {
      error: error?.message
    }
  }
}

export function unauthorized(error) {
  return {
    statusCode: 401,
    body: {
      error: error?.message
    }
  }
}

export function forbidden(error) {
  return {
    statusCode: 403,
    body: {
      error: error?.message
    }
  }
}

export function notFound(error) {
  return {
    statusCode: 404,
    body: {
      error: error?.message
    }
  }
}

export function conflict(error) {
  return {
    statusCode: 409,
    body: {
      error: error?.message
    }
  }
}

export function fail(error) {
  console.log(error?.message);
  return {
    statusCode: 500,
    body: {
      error: error?.message
    }
  }
}