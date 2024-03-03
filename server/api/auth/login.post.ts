import jwt from 'jsonwebtoken';

export default eventHandler(async (event) => {
  const { authHeaders } = await readBody(event);
  const { uid } = authHeaders;
  const SECRET = 'secret';
  const expiresIn = 60 * 60 * 24 * 1 * 1000;

  const token = jwt.sign(authHeaders._value, SECRET, {
    expiresIn,
  });

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true
  };
  setCookie(event, 'token', token, options);

  const user = { uid };
  const accessToken = jwt.sign(user, SECRET, {
    expiresIn,
  });

  return {
    token: accessToken,
  };
});
