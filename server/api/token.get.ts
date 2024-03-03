import jwt from 'jsonwebtoken';

export default eventHandler(async (event) => {
  const cookies = getCookie(event, 'token');
  const authHeaders = jwt.verify(cookies, 'secret');
  return {
    authHeaders,
  };
});
